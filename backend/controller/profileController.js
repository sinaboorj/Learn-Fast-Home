import profileModel from "../model/profileModel.js";
import trycatchHandler from "../config/trycatchHandler.js";
import Joi from 'joi';
import _ from 'lodash';
import path from 'path'
import fs from 'fs'

//******************************************************** Get *******************************  */

const get = trycatchHandler(async (req, res, next) => {
    const userID = req.params.userID
    const filterValues = ["userID", "email", "firstName", "lastName", "current_location", "phoneNumber", "picName", "url", "jobTitle", "No", "unit", "experiecne", "start", "position", "linkedin", "address", "discription","level"];

    const result = await profileModel.getById(userID)
    if (!result) return res.status(404).send({ get: false, title: 'Error', msg: `User Not Found.` });
     res.send(_.pick(result,filterValues) )
}
)

//******************************************************** Get Level No *******************************  */

const get_Level_No = trycatchHandler(async (req, res, next) => {
    const filterValues = ["userID", "email", "firstName", "lastName", "current_location", "phoneNumber", "picName", "url", "jobTitle", "No", "unit", "experiecne", "start", "position", "linkedin", "address", "discription","level"];
    const { level, No, unit } = req.body
    
     const result = await profileModel.getLevelNo(level, No, unit)
     if (!result) return res.status(404).send({ get_Level_No: false, title: 'Error', msg: `User Not Found.` });
     return res.send(_.pick(result,filterValues))
}
)

//******************************************************** Get All Users *******************************  */
const getAll = trycatchHandler(async (req, res, next) => {
    const filterValues = ["userID", "email", "firstName", "lastName", "current_location", "phoneNumber", "picName", "url", "jobTitle", "No", "unit", "experiecne", "start", "position", "linkedin", "address", "discription","level"];
    const result = await profileModel.getAllUsers()
    if (!result) return res.status(404).send({ getAll: false, title: 'Error', msg: `User Not Found.` });

    let element = []
    result.forEach((item, index) => {
        element.push(_.pick(result[index], filterValues))
    })
    return res.send(element)
}
) 

//******************************************************** Update *******************************  */
    
const updateUser = trycatchHandler(async (req, res, next) => {
   
    const userSchema = {// مشخص کردن شرایط دادهای ورودی
        firstName: Joi.string().min(3).max(59).messages({ "string.min": "FirstName: At Least 3 Character." }),
        lastName: Joi.string().min(3).max(79).messages({ "string.min": "LastName: At Least 3 Character." }),
    }
   
    const datavalidResult = Joi.object(userSchema).validate(req.body) // اعتبار سنجی دادهای ورودی در زمان به روز رساني داده هاي كاربر
    if (datavalidResult.error) return res.status(400).send(datavalidResult.error.details[0].message) 

    const userID = req.params.userID
    const { firstName, lastName, current_location, phoneNumber, linkedin, address, discription, jobTitle, No, unit, experiecne, start, position, level } = req.body
    let picName = ''
    let url = ''
  
    const userDetail = await profileModel.getById(userID)// براي پيدا كردن کاربر مورد نظر 
    if (!userDetail) return res.status(404).send({ update: false, title: 'Error', msg: 'User Not Found' });
    
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
   
    const result = await profileModel.updateUser(userID, firstName, lastName, current_location, phoneNumber, picName, url, linkedin, address, discription, jobTitle, No, unit, experiecne, start, position ,level)
    if (!result) return res.status(404).send({update: false, title: 'Error', msg: 'User Not Found' });

    // const token= jwt.sign({id:result.userID},process.env.LOGIN_PRIVATE_KEY,{expiresIn: "7d"}) // رچیسنر و لاکین همرمان با ارسال یک توکن در قسمت هدر پاسخ
     res.send(_.pick(result,["userID","email","firstName","lastName","current_location","phoneNumber","picName","url","jobTitle", "No", "unit", "experiecne", "start", "position", "linkedin", "address", "discription", "level"]) )
}
 
) 

//******************************************************** Export *******************************  */

export default { get, updateUser, getAll , get_Level_No }