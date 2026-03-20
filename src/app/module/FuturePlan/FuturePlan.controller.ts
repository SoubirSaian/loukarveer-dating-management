import { AuthRequest } from "../../../interface/authRequest";
import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import FuturePlanServices from "./FuturePlan.service";

const addNewFuturePlan = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await FuturePlanServices.addFuturePlanService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Added new future plan.",
        data: result,
    });
});

const addNewStep = catchAsync(async (req, res) => {

    const result = await FuturePlanServices.addnewStepsToPlanService(req.params.id,req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Added new step.",
        data: result,
    });
});

const markStepCompleted = catchAsync(async (req, res) => {

    const result = await FuturePlanServices.markStepAsCompletedService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Marked step as completed.",
        data: result,
    });
});

const FuturePlanController = { 
    addNewFuturePlan,
    addNewStep,
    markStepCompleted
 };

export default FuturePlanController;