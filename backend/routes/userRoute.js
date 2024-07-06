import userController from '../controller/userController.js'
import experss from 'express'

 const userRouter = experss.Router()

 userRouter.post('/register', userController.register)
 userRouter.put('/:userID/mail-verification/:token', userController.verificationIDbyToken)
 userRouter.post('/login', userController.login)

 export default userRouter  
       