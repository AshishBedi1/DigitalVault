const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:Number(process.env.MAIL_PORT),
    secure:true,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD,
    }

});

const testMailConnection = async () =>{
    await transporter.verify();
    console.log("mail server is ready")
}

module.exports  = {
    transporter,
    testMailConnection
}