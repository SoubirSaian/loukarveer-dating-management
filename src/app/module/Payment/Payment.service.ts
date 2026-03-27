import ApiError from "../../../error/ApiError";
import { IPayment } from "./Payment.interface";
import {PaymentModel} from "./Payment.model";

const stripePaymentService = async () => {

    //check which plan

    //if individual plan
        //only this user's subscription will be updated.

    //if Couple plan
        //both user's subscription will be updated

};

const PaymentServices = { 
    stripePaymentService
 };

export default PaymentServices;