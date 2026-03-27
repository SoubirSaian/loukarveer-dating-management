import express from "express";
import {auth, authorizeUser} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import DateValidations from "./Date.validation";
import DateController from "./Date.controller";


const DateRouter = express.Router();

DateRouter.post("/generate-dating-suggestion",
    authorizeUser,
    DateController.generateDatingSuggestion
);

DateRouter.patch("/edit-date/:id",
    // authorizeUser,
    DateController.editDateSuggestion
);

DateRouter.get("/get-all-date/:id",
    // authorizeUser,
    DateController.getAllDate
);

DateRouter.post("/get-single-date/:id",
    // authorizeUser,
    DateController.getSingleDate
);

DateRouter.post("/accept-date-proposal/:id",
    // authorizeUser,
    DateController.acceptDateProposal
);

DateRouter.delete("/delete-date/:id",
    // authorizeUser,
    DateController.deleteDate
);

DateRouter.post("/provide-rating",
    // authorizeUser,
    DateController.provideRating
);



export default DateRouter;