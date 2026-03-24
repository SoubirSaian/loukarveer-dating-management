import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import { AuthRequest } from "../../../interface/authRequest";
import UserServices from "./User.service";



const updateProfile = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await UserServices.updateUserProfile(user ,req.file, req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully.",
        data: result,
    });
});

const getMyProfile = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await UserServices.getMyProfile(user);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile detail retrieved.",
        data: result,
    });
});

const addImportantDate = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await UserServices.addImportantDayService(user , req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Important date added",
        data: result,
    });
});

const addNextMeet = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await UserServices.addNextMeetService(user , req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Added next meet date.",
        data: result,
    });
});


const changePassword = catchAsync(async (req, res) => {

     const { user } = req as AuthRequest;

    const result = await UserServices.changePasswordService(user,req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password changed successfully.",
        data: result,
    });
});

//dashboard

const dashboardGetUser = catchAsync(async (req, res) => {

    const result = await UserServices.getAllUserService();
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved all users successfully.",
        data: result,
    });
});

const blockUser = catchAsync(async (req, res) => {

    const result = await UserServices.blockUserService(req.params.id);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password changed successfully.",
        data: result,
    });
});

const UserController = { 
    updateProfile,
    getMyProfile,
    addImportantDate,
    addNextMeet,
    changePassword,
    dashboardGetUser,
    blockUser
 };
export default UserController;