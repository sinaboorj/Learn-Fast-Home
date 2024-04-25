import userModel from '../model/userModel.js';
import Joi from 'joi';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import trycatchHandler from '../config/trycatchHandler.js';
import dotenv from 'dotenv';
import randomString from 'randomstring'
import sendEmail from '../config/sendEmail.js';

dotenv.config(); 

//******************************************************** Register *******************************  */

const register = trycatchHandler(async (req, res, next) => {
    let newUser = []
    const schema = {
        email: Joi.string().email().required().messages({ "string.email": "Email is wrong." }),
        password: Joi.string().min(6).max(100).required().messages({ "string.min": "Password must be at least 6 characters" }),
    };

    const datavalidResult = Joi.object(schema).validate(req.body); // اعتبارسنجی داده‌های ورودی
    if (datavalidResult.error) throw datavalidResult.error;

    const chechEmail = await userModel.getByEmail(req.body.email); // بررسی وجود ایمیل قبلی و وضعیت تایید کاربر
    if (chechEmail && chechEmail.verified === 1) return res.status(400).send({ sendingEmail: false, title: 'Error', msg: 'This user Already Registered' });
    
    //const salt = await bcrypt.genSalt(number(process.env.SALT)); // ايمن تر كردن رمز
    const hashPassword = await bcrypt.hash(req.body.password, 10); // رمزنگاری رمز عبور
    const randomToken = randomString.generate() // ایجاد توکن تصادفی
    
    const verified = 0;
    if (!chechEmail) {
        newUser = await userModel.insertUser(req.body.email, hashPassword, randomToken, verified); // افزودن کاربر جدید
    }
    if (chechEmail && chechEmail.verified === 0) { // ارسال توكن جديد براي كاربر
        newUser = await userModel.updateToken(req.body.email, randomToken)
    }
    
    let mailSubject = 'Email Verification'
    let url = `
    <br>
    <br>
    <div> *** Email Verification *** </div>
    <div><h4>Learn Fast:</h4></div>
    <div>Hi ${req.body.email}</div>
    <br>
    <span>Please <a href= "${process.env.BASE_URL}/api/${newUser.userID}/mail-verification/${randomToken}"> Verify </a> your email</span>
    <br>`
    
    const sentMail = await sendEmail(req.body.email, mailSubject, url) //ارسال ايميل براي تاييد كاربر
    
    // const token = jwt.sign({ id: newUser.userID }, process.env.LOGIN_PRIVATE_KEY, { expiresIn: "7d" }); // صادره توکن برای ورود
    // res.header('Authorization', token).send(_.pick(newUser, ["userID", "email"]));
    res.send(sentMail);

}
);

//******************************************************** Login *******************************  */

const login = trycatchHandler(async (req, res, next) => {
    const schema = {// مشخص کردن شرایط دادهای ورودی
        email: Joi.string().email().required().messages({ "string.email": "Email: Email Is Wrong." }),
        password: Joi.string().min(6).max(100).required().messages({ "string.min": "Password: At Least 6 Character." }),
    }
    const datavalidResult = Joi.object(schema).validate(req.body) //اعتبار سنجی دادهای ورودی
    if (datavalidResult.error) throw datavalidResult.error
        
    const chechUser = await userModel.getByEmail(req.body.email)//چک کردن ایمیل
    if (!chechUser) return res.status(404).send({ login: false ,type:'Email', title: 'Error', msg: 'Email is invalid' });
    
    if (chechUser.verified === 0) return res.send({ login: false , type:'Verify', title: 'Error', msg: 'Please verify your Email' }); // اگر ايميل وريفاي نشده بود

    const validPass = await bcrypt.compare(req.body.password, chechUser.password)// چک کردن پسورد
    if (!validPass) return res.send({ login: false , type:'Password', title: 'Error', msg: 'Password is invalid' });
  
    const token = jwt.sign({ login: true , token:chechUser.token }, process.env.LOGIN_PRIVATE_KEY)// ارسال توکن کاربر لاکین شده
    res.header('Authorization',token).send(_.pick(chechUser,["userID","email"]) )
   
}
)

//******************************************************** Get *******************************  */

const get = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID

    const result = await userModel.getById(userID)
    if (!result) return res.status(404).send({ update: false, title: 'Error', msg: `User Not Found.` });
  
     res.send(_.pick(result,["userID","email","firstName","lastName","country","phoneNumber","title","picName","url"]) )
}
)

//******************************************************** Verification ID *******************************  */

const verificationIDbyToken = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID
    const token = req.params.token
    
    const result = await userModel.getIDandToken(userID ,token) // بررسی آی دی و نوکن
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
 
//******************************************************** Update *******************************  */
    
const updateUser = trycatchHandler(async (req, res, next) => {
   
    const userSchema = {// مشخص کردن شرایط دادهای ورودی
        firstName: Joi.string().min(2).max(59).messages({ "string.min": "FirstName: At Least 2 Character." }),
        lastName: Joi.string().min(2).max(79).messages({ "string.min": "LastName: At Least 2 Character." }),
        phoneNumber: Joi.number().integer().sign('positive').messages({ "number.base": "The Phone Number Must Be An Integer.", "number.positive": "The Phone Number Must Start With A + SSign" }),
    }
   
    const datavalidResult = Joi.object(userSchema).validate(req.body) // اعتبار سنجی دادهای ورودی در زمان به روز رساني داده هاي كاربر
    if (datavalidResult.error) throw datavalidResult.error
    
    const userID = req.params.userID
    const { firstName, lastName, country, phoneNumber} = req.body
    let picName = ''
    let url = ''
  
    const userDetail = await userModel.getById(userID)// براي پيدا كردن کاربر مورد نظر 
    if (!userDetail) return res.status(404).send({update: false, title: 'Error', msg: 'User Not Found' });

    if (req.files !== null) {
        if (userDetail.picName !== null ) {
            const filePath = `./public/images/${userDetail.picName}`
            fs.unlinkSync(filePath) //و حذف عكس قبل
        } 
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)      
        picName = file.md5 + ext
        url = `${req.protocol}://${req.get('host')}/images/${picName}`
        const allowType = ['.jpg', '.png', '.jpeg']
        if (!allowType.includes(ext.toLowerCase()))   return res.send({ msg: 'Format is not allowed' }) 
        if (fileSize > 3000000) return res.send({ msg: 'The file length is larger than the limit' }) 
        try {
             file.mv(`./public/images/${picName}`)
        } catch (error) {
            return res.send({ msg: 'An error in add image' }) 
        }
    } else {
        picName = userDetail.picName  // بدون تغییر ماندن عکس در صورت عدم تصمیم به اصلاح
        url = userDetail.url
    }
    
    const result = await userModel.updateUser(userID, firstName, lastName, country, phoneNumber, picName, url)
    if (!result) return res.status(404).send({update: false, title: 'Error', msg: 'User Not Found' });

    // const token= jwt.sign({id:result.userID},process.env.LOGIN_PRIVATE_KEY,{expiresIn: "7d"}) // رچیسنر و لاکین همرمان با ارسال یک توکن در قسمت هدر پاسخ
     res.send(_.pick(result,["userID","email","firstName","lastName","country","phoneNumber","picName","url"]) )
}
     
) 

//******************************************************** Export *******************************  */

export default { register, login, updateUser, get , verificationIDbyToken }

  