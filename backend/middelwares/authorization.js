import twj from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function authorization(req, res, next) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send('Access denied')
    try {
        const decode = twj.verify(token, process.env.LOGIN_PRIVATE_KEY)
        req.userData = decode
        next()
    } catch (error) {
        return res.status(400).send('Token is invalid') 
    }
   
    
}
export default authorization
