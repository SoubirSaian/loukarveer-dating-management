import express from "express";
import {auth} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import CoupleValidations from "./Couple.validation";
import CoupleController from "./Couple.controller";


const CoupleRouter = express.Router();



export default CoupleRouter;