import profileController from '../controller/profileController.js'
import experss from 'express'
import authorization from '../middelwares/authorization.js'

const profileRouter = experss.Router()

profileRouter.get('/users', authorization, profileController.getAll)
profileRouter.get('/user/:userID?', authorization, profileController.get)
profileRouter.post('/user-info', authorization, profileController.get_Level_No)
profileRouter.put('/update/:userID?', authorization, profileController.updateUser)

export default profileRouter   



       