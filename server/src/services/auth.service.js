const bcrypt =  require("bcrypt");
const prisma = require("../config/prisma");

const { generateVerificationToken } = require("../utils/token");
const { redisClient } = require("../config/redis")

const createUser = async(userData) => {
    const {name, email, password} = userData;
    const existingUser = await prisma.user.findUnique({
        where:{
            email,
        },
    });

    if (existingUser){
        return{
            success:false,
            message:"user already exist",
        }
    }

    //hashPassword
    const hashedPassword = await bcrypt.hash(password,10);


    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });

    //genearting verification token
    const verificationToken = generateVerificationToken();
    //storing on redis for 10 mins
    await redisClient.set(
        `verification:${verificationToken}`,
        user.id,{
            EX:600,
        }
    )
    return {
        success:true,
        message:"user registred successfully, please verify your email",
        user,
    }
};

module.exports = {
    createUser
}