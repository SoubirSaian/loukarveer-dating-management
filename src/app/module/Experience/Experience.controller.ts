import { AuthRequest } from "../../../interface/authRequest";
import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import ExperienceServices from "./Experience.service";

//memory
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

//memory

const addSharedActivity = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.addSharedActivityService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Added new activity",
        data: result,
    });
});

const getAllActivity = catchAsync(async (req, res) => {

    //  const { user } = req as AuthRequest;

    const result = await ExperienceServices.getSharedActivityService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all activity.",
        data: result,
    });
});

const markActivityComplete = catchAsync(async (req, res) => {

    //  const { user } = req as AuthRequest;

    const result = await ExperienceServices.markSharedActivityCompleteService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Activity is completed",
        data: result,
    });
});

//spark

const addCustomSpark = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.addcustomPromptService(user, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Added spark.",
        data: result,
    });
});

const sendSparkToPartner = catchAsync(async (req, res) => {

    //  const { user } = req as AuthRequest;

    const result = await ExperienceServices.sendPromptService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Spark sent.",
        data: result,
    });
});

const getMySpark = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.getMyPromptService(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved my spark.",
        data: result,
    });
});

const getALLSpark = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.getAllPromptService(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all spark.",
        data: result,
    });
});

//disappear file

const sendTempFile = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.sendTemporaryFile(user,req.file,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Temporary file sent.",
        data: result,
    });
});

const getTempFile = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.getTemporaryFile(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved temp file.",
        data: result,
    });
});

const tempFileAutoRemove = catchAsync(async (req, res) => {

    //  const { user } = req as AuthRequest;

    const result = await ExperienceServices.disappearTemporaryFile(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Temp file removed.",
        data: result,
    });
});

//check in

const addCheckIn = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.addCheckInService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "New check in added.",
        data: result,
    });
});

const getPartnerCheckIn = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await ExperienceServices.getPartnerCheckInService(user,req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all memory.",
        data: result,
    });
});

const ExperienceController = { 
    addNewMemory,
    getALLMemory,
    addSharedActivity,
    getAllActivity,
    markActivityComplete,
    addCustomSpark,
    sendSparkToPartner,
    getMySpark,
    getALLSpark,
    sendTempFile,
    getTempFile,
    tempFileAutoRemove,
    addCheckIn,
    getPartnerCheckIn
 };

export default ExperienceController;