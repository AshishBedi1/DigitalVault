const {createUser} = require("../services/auth.service")

const registerUser = async(req, res) => {
    try{
       const result = await createUser(req.body);
       res.status(201).json(result);
    }
    catch(error){
        res.status(500).json({
            success:false,
            message: "internal server error"
        });
    }
}

module.exports = {
    registerUser
}