const {z, email} = require("zod");

const registerSchema = z.object({
    name: z
    .string()
    .min(3,"name must contain 3 characters")
    .max(50,"name is too long"),



    email:z
    .string()
    .email("invalid email address"),


    password:z
    .string()
    .min(8,"password must contain 8 characters"),
})

module.exports ={
    registerSchema
}