import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import CoupleValidations from "./Couple.validation";
import CoupleController from "./Couple.controller";


const CoupleRouter = express.Router();

CoupleRouter.post("/send-link-request",
    authorizeUser,
    CoupleController.sendLinkRequest
);

CoupleRouter.post("/accept-link-request",
    // authorizeUser,
    CoupleController.acceptLinkRequest
);

CoupleRouter.post("/reject-link-request",
    // authorizeUser,
    CoupleController.rejectLinkRequest
);

CoupleRouter.post("/unlink-connection",
    authorizeUser,
    CoupleController.unlinkConnection
);



export default CoupleRouter;