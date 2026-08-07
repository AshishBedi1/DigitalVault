const bcrypt =  require("bcrypt")
const prisma = require("../config/prisma")

const createUser = async(userData) => {
    const {name, email, password} = userData;

    const hashedPassword = await bcrypt.hash(password,10);

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

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
    return {
        success:true,
        message:"user registred successfully",
        user,
    }
};

module.exports = {
    createUser
}