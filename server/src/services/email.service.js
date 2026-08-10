const {transporter} =  require("../config/mail");
const sendVerificationEmail = async(email,verificationToken) => {
    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;

    await transporter.sendMail({
        from : process.env.MAIL_USER,
        to:email,
        subject:"verify your DigitalVault account",
        html:
        `
        <h2>welcome to DigitalVault </h2>
        <p>please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}">
            verify email
        </a>

        <p>this link is expire in 10 minutes</P>
        `
    })
}

module.exports = {
    sendVerificationEmail,
};