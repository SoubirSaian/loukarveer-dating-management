import { AuthRequest } from "../../../interface/authRequest";
import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import ExperienceServices from "./Experience.service";

const addNewMemory = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.addMemoryService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "New memory added.",
        data: result,
    });
});

const getALLMemory = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.getmyMemoryService(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all memory.",
        data: result,
    });
});

const ExperienceController = { 
    addNewMemory,
    getALLMemory
 };

export default ExperienceController;