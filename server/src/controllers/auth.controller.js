const {createUser} = require("../services/auth.service");
const { registerSchema } = require("../validation/auth.validation");
const { zodError, success } = require("zod");

const registerUser = async(req, res) => {
    try{
        const validatedData = registerSchema.parse(req.body);
       const result = await createUser(validatedData);
       res.status(201).json(result);
    }
    catch(error){
        if(error instanceof zodError){
            res.status(400).json({
                success: false,
                error:error.error
            })
        }
        res.status(500).json({
            success:false,
            message: "internal server error"
        });
    }
}

module.exports = {
    registerUser
}