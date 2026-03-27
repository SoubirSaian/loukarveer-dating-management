import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import ExperienceValidations from "./Experience.validation";
import ExperienceController from "./Experience.controller";


const ExperienceRouter = express.Router();

//Memory

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

//shared activity

ExperienceRouter.post("/add-shared-activity",
    authorizeUser,
    validateRequest(ExperienceValidations.addSharedActivityValidation),
    ExperienceController.addSharedActivity
);

ExperienceRouter.get("/get-all-activity",
    // authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getAllActivity
);

ExperienceRouter.post("/mark-activity-complete",
    // authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.markActivityComplete
);

//spark

ExperienceRouter.post("/add-custom-spark",
    authorizeUser,
    validateRequest(ExperienceValidations.addPromptValidation),
    ExperienceController.addCustomSpark
);

ExperienceRouter.post("/send-spark-partner",
    // authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.sendSparkToPartner
);

ExperienceRouter.get("/get-my-spark",
    authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getMySpark
);

ExperienceRouter.get("/get-all-spark",
    authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getALLSpark
);

//disappear file

ExperienceRouter.post("/send-temp-file",
    authorizeUser,
    validateRequest(ExperienceValidations.addTempFileValidation),
    ExperienceController.sendTempFile
);

ExperienceRouter.get("/get-temp-file",
    authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getTempFile
);

ExperienceRouter.get("/remove-temp-file",
    // authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.tempFileAutoRemove
);

//check in

ExperienceRouter.post("/add-new-checkin",
    authorizeUser,
    validateRequest(ExperienceValidations.addCheckInValidation),
    ExperienceController.addCheckIn
);

ExperienceRouter.get("/get-partner-checkin",
    authorizeUser,
    // validateRequest(ExperienceValidations.addMemoryValidation),
    ExperienceController.getPartnerCheckIn
);



export default ExperienceRouter;