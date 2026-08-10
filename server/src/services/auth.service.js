const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const { generateVerificationToken } = require("../utils/token");
const { redisClient } = require("../config/redis");
const { sendVerificationEmail } = require("./email.service");
const { success } = require("zod");
const { tr } = require("zod/v4/locales");

const createUser = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return {
            success: false,
            message: "user already exist",
        }
    }

    //hashPassword
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    //genearting verification token
    const verificationToken = generateVerificationToken();
    //storing on redis for 10 mins
    await redisClient.set(
        `verification:${verificationToken}`,
        user.id, {
        EX: 600,
    }
    );
    await sendVerificationEmail(email, verificationToken);
    return {
        success: true,
        message: "user registred successfully, please verify your email",

    }
};

const verifyUserEmail = async (token) => {
    const userId = await redisClient.get(
        `verification${token}`
    )
    if (!usedId) {
        return {
            success: false,
            message: "invalid or expired verification token"
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    if (!user) {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isverified: true,
            }
        })

        await redisClient.del(`verification${token}`);
    }

    console.log("user id for redis:", userId)
}
module.exports = {
    createUser
}