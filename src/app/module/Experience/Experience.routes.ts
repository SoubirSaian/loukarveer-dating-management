import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import ExperienceValidations from "./Experience.validation";
import ExperienceController from "./Experience.controller";


const ExperienceRouter = express.Router();

ExperienceRouter.post("/add-new-memory",
    authorizeUser,
    validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.addNewMemory
);

ExperienceRouter.get("/get-all-memory",
    authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getALLMemory
);



export default ExperienceRouter;