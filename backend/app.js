import express from "express"
import fileUpload from 'express-fileupload'
import cors from "cors"
import dotenv from 'dotenv'
import homeRouter from "./routes/homeRoute.js"
import userRouter from "./routes/userRoute.js"
import errorHandler from "./middelwares/errorHandler.js"

dotenv.config() 
const app = express()
 
app.use(cors())
app.use(express.json())  
app.use(fileUpload())
console.clear()

app.use(express.static('public'))   //public خوانده فايل در فولدر 
app.use('/', homeRouter)
app.use('/api',userRouter)
 

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`***********************************  PORT:${port}  *********************************`)
})      