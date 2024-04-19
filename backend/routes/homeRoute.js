import express from "express";
import homeController from '../controller/homeController.js'
const homeRouter = express.Router()

homeRouter.get('/', homeController)

export default homeRouter