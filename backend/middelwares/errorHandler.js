import appErrors from "../config/appErrors.js"


const errorHandler = (error, req, res, next) => {
  
    if (error.name === 'ValidationError')
        return res.send(error.details[0].message)
       
    if (error instanceof appErrors)
        return res.status(error.statusCode).send({errorCode:error.errorCode, message: error.message})
    res.status(400).send(`Something is failed`)
}

export default errorHandler
