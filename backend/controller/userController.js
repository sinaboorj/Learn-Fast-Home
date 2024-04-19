import userModel from '../model/userModel.js';
import Joi from 'joi';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import trycatchHandler from '../config/trycatchHandler.js';
import appErrors from '../config/appErrors.js';
import dotenv from 'dotenv';
import randomString from 'randomstring'
import sendEmail from '../config/sendEmail.js';

dotenv.config(); 

//******************************************************** Register *******************************  */

const register = trycatchHandler(async (req, res, next) => {
    let newUser = []
    const schema = {
        email: Joi.string().email().required().messages({ "string.email": "Email: Email Is Wrong." }),
        password: Joi.string().min(6).max(100).required().messages({ "string.min": "Password: At Least 6 Character." }),
    };
  
    const datavalidResult = Joi.object(schema).validate(req.body); // اعتبارسنجی داده‌های ورودی
    if (datavalidResult.error) throw datavalidResult.error;

    const chechEmail = await userModel.getByEmail(req.body.email); // بررسی وجود ایمیل قبلی و وضعیت تایید کاربر
    if (chechEmail && chechEmail.verified === 1) throw new appErrors(102, 'User Already Registered', 400);
    
    //const salt = await bcrypt.genSalt(number(process.env.SALT)); // ايمن تر كردن رمز
    const hashPassword = await bcrypt.hash(req.body.password, 10); // رمزنگاری رمز عبور
    const randomToken = randomString.generate() // ایجاد توکن تصادفی
    
    const verified = 0;
    if (!chechEmail) {
        newUser = await userModel.insertUser(req.body.email, hashPassword, randomToken, verified); // افزودن کاربر جدید
    }
    if (chechEmail && chechEmail.verified === 0) { // ارسال توكن جديد براي كاربر
        newUser = await userModel.updateToken(req.body.email ,randomToken)
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
    if (!chechUser) throw new appErrors(400, 'Email is invalid', 100)
        
    const validPass = await bcrypt.compare(req.body.password, chechUser.password)// چک کردن پسورد
    if (!validPass) throw new appErrors(400, 'Password is invalid', 100)
  
    const token = jwt.sign({ id: chechUser.userID, verified:chechUser.verified }, process.env.LOGIN_PRIVATE_KEY)// ارسال توکن کاربر لاکین شده
    res.send(token)
}
)

//******************************************************** Get *******************************  */

const get = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID

    const result = await userModel.getById(userID)
     if (!result) throw new appErrors(400, `UPDATE ERROR: userID(${userID}) Not Found.`, 101)
  
     res.send(_.pick(result,["userID","email","firstName","lastName","country","phoneNumber","title","picName","url"]) )
}
)

//******************************************************** Verification ID *******************************  */

const verificationIDbyToken = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID
    const token = req.params.token
    
    const result = await userModel.getIDandToken(userID ,token) // بررسی آی دی و نوکن
    if (!result) throw new appErrors(400, `Invalid link`, 102)

    if (result.verified !== 1) {
        const verified = 1;
        const verify = await userModel.userVerify(userID, verified)
        if (!verify) throw new appErrors(400, `Invalid verification`, 103)
        res.send({ verifyStatue: true , msg:'Email verified successfully'})
    } else {
        res.send({ verifyStatue: false , msg:'This user already verified'})
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
    if (!userDetail) throw new appErrors(400, `UPDATE ERROR: userID(${userID}) Not Found.`, 104)

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
     if (!result) throw new appErrors(400, `UPDATE ERROR: userID(${userID}) Not Found.`, 105)

    // const token= jwt.sign({id:result.userID},process.env.LOGIN_PRIVATE_KEY,{expiresIn: "7d"}) // رچیسنر و لاکین همرمان با ارسال یک توکن در قسمت هدر پاسخ
     res.send(_.pick(result,["userID","email","firstName","lastName","country","phoneNumber","picName","url"]) )
}
     
) 

//******************************************************** Export *******************************  */

export default { register, login, updateUser, get , verificationIDbyToken }

  