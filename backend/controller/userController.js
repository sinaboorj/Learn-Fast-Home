import userModel from '../model/userModel.js';
import Joi from 'joi';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import trycatchHandler from '../config/trycatchHandler.js';
import dotenv from 'dotenv';
import randomString from 'randomstring'
import sendEmail from '../config/sendEmail.js';
import profileModel from '../model/profileModel.js';

dotenv.config(); 

//******************************************************** Register *******************************  */

const register = trycatchHandler(async (req, res, next) => {
    let newUser = []
    const schema = {
        email: Joi.string().email().required().messages({ "string.email": "Email is wrong." }),
        password: Joi.string().min(6).max(100).required().messages({ "string.min": "Password must be at least 6 characters" }),
    };

    const datavalidResult = Joi.object(schema).validate(req.body); // اعتبارسنجی داده‌های ورودی
    if (datavalidResult.error) return res.status(400).send(datavalidResult.error.details[0].message) ;

    const checkEmail = await profileModel.getByEmail(req.body.email); // بررسی وجود ایمیل قبلی و وضعیت تایید کاربر
    if (checkEmail && checkEmail.verified === 1) return res.status(400).send({ status: false, title: 'Error', msg: 'This user Already Registered' });
   
    //const salt = await bcrypt.genSalt(number(process.env.SALT)); // ايمن تر كردن رمز
    const hashPassword = await bcrypt.hash(req.body.password, 10); // رمزنگاری رمز عبور
    const randomToken = randomString.generate() // ایجاد توکن تصادفی
    
    const verified = 0;
    if (!checkEmail) {
        newUser = await userModel.insertUser(req.body.email, hashPassword, randomToken, verified); // افزودن کاربر جدید
    }

    if (checkEmail && checkEmail.verified === 0) { // ارسال توكن جديد براي كاربر
        newUser = await userModel.updateToken(req.body.email, randomToken)
    }
    
    let mailSubject = 'Email Verification'
    let url = `
    <br>
    <br>
    <div> *** Email Verification *** </div>
    <div><h4>Learn Fast:</h4></div>
    <div >Hi ${req.body.email}</div>
    <br>
    <span>Please <a href= "${process.env.BASE_URL}/api/${newUser.userID}/mail-verification/${randomToken}"> Verify </a> your email</span>
    <br>`
    
    const sentMail = await sendEmail(req.body.email, mailSubject, url) //ارسال ايميل براي تاييد كاربر
    
    // const token = jwt.sign({ id: newUser.userID }, process.env.LOGIN_PRIVATE_KEY, { expiresIn: "7d" }); // صادره توکن برای ورود
    // res.header('Authorization', token).send(_.pick(newUser, ["userID", "email"]));
    res.status(400).send(sentMail);

}
);

//******************************************************** Login *******************************  */

const login = trycatchHandler(async (req, res, next) => {
    const schema = {// مشخص کردن شرایط دادهای ورودی
        email: Joi.string().email().required().messages({ "string.email": "Email is invalid" }),
        password: Joi.string().required(),
    }
    const datavalidResult = Joi.object(schema).validate(req.body) //اعتبار سنجی دادهای ورودی
    if (datavalidResult.error) return res.status(400).send(datavalidResult.error.details[0].message) 
        
    const chechUser = await profileModel.getByEmail(req.body.email)//چک کردن ایمیل
    if (!chechUser) return res.status(400).send({ status: false , type:'Email', title: 'Error', msg: 'Email is invalid' });
    
    if (chechUser.verified === 0) return res.status(400).send({ status: false , type:'Verify', title: 'Error', msg: 'Please verify your Email' }); // اگر ايميل وريفاي نشده بود

    const validPass = await bcrypt.compare(req.body.password, chechUser.password)// چک کردن پسورد
    if (!validPass) return res.status(400).send({ status: false , type:'Password', title: 'Error', msg: 'Password is wrong' });
  
    const token = jwt.sign({ status: true , title: 'Successful', msg: 'Login successfully', token:chechUser.token }, process.env.LOGIN_PRIVATE_KEY)// ارسال توکن کاربر لاکین شده
    res.header('authorization', token).send(_.pick(chechUser, ["userID", "email","unit","level","No"]))
}
)

//******************************************************** Verification ID *******************************  */

const verificationIDbyToken = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID
    const token = req.params.token
    
    const result = await profileModel.getIDandToken(userID ,token) // بررسی آی دی و نوکن
    if (!result) return res.status(404).send({verification: false, title: 'Error', msg: 'Invalid link' });

    if (result.verified !== 1) {
        const verified = 1;
        const verify = await userModel.userVerify(userID, verified)
        if (!verify)  {
            return  res.status(404).send({ verification: false, title: 'Error', msg: 'Invalid verification' })
        }else {
            return res.status(404).send({ verification: true , title: 'Successful', msg:'Email verified successfully'})
        }
    } else {
        return res.status(404).send({ verification: true,  title: 'Error' , msg:'This user already verified'})
    }
}
)

//******************************************************** Export *******************************  */

export default { register, login, verificationIDbyToken }

