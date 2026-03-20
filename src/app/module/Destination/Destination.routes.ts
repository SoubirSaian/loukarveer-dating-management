import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import DestinationValidations from "./Destination.validation";
import DestinationController from "./Destination.controller";
import { uploadProfile } from "../../middlewares/multerMiddleware";


const DestinationRouter = express.Router();

DestinationRouter.post("/add-new-destination",
    authorizeUser,
    validateRequest(DestinationValidations.createDestinationValidation),
    DestinationController.addNewDestination
);

DestinationRouter.get("/get-all-destination",
    authorizeUser,
    // validateRequest(DestinationValidations.createDestinationValidation),
    DestinationController.getMyDestination
);

DestinationRouter.post("/add-destination-photo",
    authorizeUser,
    uploadProfile.array("destination-image",5),
    // validateRequest(DestinationValidations.createDestinationValidation),
    DestinationController.addDestinationPhoto
);



export default DestinationRouter;