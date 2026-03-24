import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import FuturePlanValidations from "./FuturePlan.validation";
import FuturePlanController from "./FuturePlan.controller";


const FuturePlanRouter = express.Router();

FuturePlanRouter.post("/add-future-plan",
    authorizeUser,
    validateRequest(FuturePlanValidations.addNewFuturePlanValication),
    FuturePlanController.addNewFuturePlan
);

FuturePlanRouter.post("/add-new-step/:id",
    // authorizeUser,
    validateRequest(FuturePlanValidations.addNewStepValication),
    FuturePlanController.addNewStep
);

FuturePlanRouter.post("/mark-step-completed",
    // authorizeUser,
    // validateRequest(FuturePlanValidations.addNewFuturePlanValication),
    FuturePlanController.markStepCompleted
);

FuturePlanRouter.get("/get-my-plans",
    authorizeUser,
    // validateRequest(FuturePlanValidations.addNewFuturePlanValication),
    FuturePlanController.getAllPlan
);



export default FuturePlanRouter;