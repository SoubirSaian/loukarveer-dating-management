import { AuthRequest } from "../../../interface/authRequest";
import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import DateServices from "./Date.service";

const generateDatingSuggestion = catchAsync(async (req, res) => {

    const { user } = req as AuthRequest;

    const result = await DateServices.generateSuggestionService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Generated new dating suggestion.",
        data: result,
    });
});

const editDateSuggestion = catchAsync(async (req, res) => {

    const result = await DateServices.editDateService(req.params.id,req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Updated Dating proposal.",
        data: result,
    });
});

const getAllDate = catchAsync(async (req, res) => {

    const result = await DateServices.getAllDateProposal(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all date proposal.",
        data: result,
    });
});

const getSingleDate = catchAsync(async (req, res) => {

    const result = await DateServices.getSingleDateProposal(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved a date details.",
        data: result,
    });
});

const acceptDateProposal = catchAsync(async (req, res) => {

    const result = await DateServices.acceptDateProposal(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Date proposal accepted.",
        data: result,
    });
});

const deleteDate = catchAsync(async (req, res) => {

    const result = await DateServices.deleteDateProposal(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Deleted date proposal.",
        data: result,
    });
});

const provideRating = catchAsync(async (req, res) => {

    const result = await DateServices.provideRating(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rating added.",
        data: result,
    });
});

const DateController = { 
    generateDatingSuggestion,
    editDateSuggestion,
    getAllDate,
    getSingleDate,
    acceptDateProposal,
    deleteDate,
    provideRating
 };

export default DateController;