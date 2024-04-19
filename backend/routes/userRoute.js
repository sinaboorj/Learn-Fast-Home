import userController from '../controller/userController.js'
import experss from 'express'
import authorization from '../middelwares/authorization.js'

const userRouter = experss.Router()

userRouter.post('/register', userController.register)
userRouter.put('/:userID/mail-verification/:token', userController.verificationIDbyToken)
userRouter.post('/login', userController.login)
//userRouter.use(authorization) //مجور بررسی میشود
userRouter.put('/update/:userID?', userController.updateUser)
userRouter.get('/:userID?', userController.get)

export default userRouter  
       