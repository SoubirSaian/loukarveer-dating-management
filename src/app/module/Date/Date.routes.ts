import express from "express";
import {auth} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import DateValidations from "./Date.validation";
import DateController from "./Date.controller";


const DateRouter = express.Router();



export default DateRouter;