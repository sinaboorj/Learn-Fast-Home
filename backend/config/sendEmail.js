import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config(); 

const sendEmail = async (email, mailSubject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'live.smtp.mailtrap.io',
			port: 587,
			auth: {
				user: process.env.SMTP_MAIL,
				pass: process.env.SMTP_PASSWORD,
			}
		}) 
		const mailOptions = {
			from: 'mailtrap@borjonline.com',
			to: email,
			subject: mailSubject,
			html: text,
		};

		await transporter.sendMail(mailOptions)
		return { status: true, title: 'Email sent successfully!', msg: 'An Email sent to your account , please verify' };
	} catch (error) {
		return { status: false, title: 'Registration error!', msg: error.message };
	}
};


export default sendEmail

   
