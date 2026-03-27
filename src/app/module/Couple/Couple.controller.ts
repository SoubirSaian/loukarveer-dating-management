import { AuthRequest } from "../../../interface/authRequest";
import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import CoupleServices from "./Couple.service";

const sendLinkRequest = catchAsync(async (req, res) => {

    const { user } = req as AuthRequest;

    const result = await CoupleServices.sendConnectionRequest(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Sent connection request.",
        data: result,
    });
});

const acceptLinkRequest = catchAsync(async (req, res) => {

    const result = await CoupleServices.acceptConnectionRequest(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Partner linked.",
        data: result,
    });
});

const rejectLinkRequest = catchAsync(async (req, res) => {

    const result = await CoupleServices.rejectConnectionRequest(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rejected link request.",
        data: result,
    });
});

const unlinkConnection = catchAsync(async (req, res) => {

    const result = await CoupleServices.unlinkConnection(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Partner connection unlinked.",
        data: result,
    });
});

//dashboard

const CoupleController = { 
    sendLinkRequest,
    acceptLinkRequest,
    rejectLinkRequest,
    unlinkConnection,
 };

export default CoupleController;