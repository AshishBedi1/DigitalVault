const prisma = require("../config/prisma")

const createUser = async() => {
    return{
        success:true,
        message:"user created successfully"
    };
};

module.exports = {
    createUser
}