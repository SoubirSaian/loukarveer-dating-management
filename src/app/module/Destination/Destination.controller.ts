import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import DestinationServices from "./Destination.service";
import { AuthRequest } from "../../../interface/authRequest";

const addNewDestination = catchAsync(async (req, res) => {

    const {user} = req as AuthRequest;

    const result = await DestinationServices.addDestinationService(user,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Added new Destination",
        data: result,
    });
});

const getMyDestination = catchAsync(async (req, res) => {

    const { user } = req as AuthRequest;

    const result = await DestinationServices.getMyDestinationService(user,req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all my destination.",
        data: result,
    });
});

const addDestinationPhoto = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

     const files = req.files as Express.Multer.File[];

    const result = await DestinationServices.addPhotoService(user,files,req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Added pdestination photos.",
        data: result,
    });
});

const DestinationController = { 
    addNewDestination,
    getMyDestination,
    addDestinationPhoto,
 };

export default DestinationController;