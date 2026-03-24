import express from "express";
import {auth} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import PaymentValidations from "./Payment.validation";
import PaymentController from "./Payment.controller";


const PaymentRouter = express.Router();



export default PaymentRouter;