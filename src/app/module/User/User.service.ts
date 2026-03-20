import ApiError from "../../../error/ApiError";
import { Express } from "express";
import {  IChangePassword, IUser, TaddDate } from "./User.interface";
import UserModel from "./User.model";
import { JwtPayload } from "jsonwebtoken";
import deleteOldFile from "../../../utilities/deleteFile";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { email } from "zod";



const updateUserProfile = async (userDetails: IJwtPayload,file: Express.Multer.File | undefined,payload: Partial<IUser>) => {
  const { profileId } = userDetails;

  // Fetch user and profile in parallel
  const user = await UserModel.findById(profileId);
   

  if (!user ) {
    throw new ApiError(404, "Profile not found to update.");
  }

  // Update fields
  const { name } = payload;

  if (name) {
    user.name = name;
  }

//   if (phone) {
//     user.phone = phone;
//   }

  // Handle image update
  if (file) {

    if (user.image) deleteOldFile(user.image as string);

    user.image = `uploads/profile-image/${file.filename}`;
  }

  // Save both
  await user.save();

  // Return a unified response
  return {
      name: user.name,
      email: user.email,
  };
};


const getMyProfile = async (userDetails: JwtPayload) => {

    const {profileId} = userDetails;
    
    const user = await UserModel.findById(profileId);

    if(!user){
        throw new ApiError(404,"failed to get profile detail.");
    }

    return user;
    
}

const addImportantDayService = async (userDetails: JwtPayload,payload: TaddDate) => {

    const {profileId} = userDetails;
    
    const user = await UserModel.findById(profileId);

    if (!user) {
        throw new Error("User not found to add important days.");
    }

    user.importantDays.push(payload);

    await user.save();

    return user.importantDays;

    // const userId = "USER_ID";

    // const newImportantDay = {
    // label: "Anniversary",
    // image: "anniversary.png",
    // date: new Date("2026-06-15")
    // };

    // const updatedUser = await UserModel.findByIdAndUpdate(
    // userId,
    // {
    //     $push: { importantDays: newImportantDay }
    // },
    // { new: true }
    // );
}


const addNextMeetService = async (userDetails: JwtPayload,payload: {date: Date}) => {
    // Service logic goes here
    const {profileId} = userDetails;

    const user = await UserModel.findById(profileId);

    if (!user) {
        throw new Error("User not found to add next meet date.");
    }

    user.nextMeet = payload.date;

    await user.save();

    return user.nextMeet;
  
}

const changePasswordService = async (userDetails: IJwtPayload, payload: IChangePassword) => {
    // Service logic goes here
    const { authId } = userDetails;
    const { currentPassword, newPassword } = payload;

    const user =  await UserModel.findById(authId).select('+password');
    if(!user){
        throw new ApiError(404,'User not found');
    }

    // const isPasswordMatched = await user.isPasswordMatched(oldPassword);
    // if(!isPasswordMatched){
    //     throw new ApiError(400,'Old password is incorrect');
    // }
    if(user.password !== currentPassword){
        throw new ApiError(400,'Current password is incorrect.');
    }

    user.password = newPassword;
    await user.save();

    return null;
}


//dashboard

const getAllUserService = async () => {
    const users = await UserModel.find({}).lean();
    return users;
}

const blockUserService = async (userId: string) => {
    
    if(!userId){
        throw new ApiError(400,"User id is required to block a user");
    }

    const user = await UserModel.findById(userId);

    if(!user){
        throw new ApiError(404,"User not found to block.");
    }

    user.isBlocked = !user.isBlocked;

    let msg = user.isBlocked ? "User has been blocked successfully." : "User has been unblocked successfully.";

    await user.save();

    return {
        user: { name: user.name, email: user.email, isBlocked: user.isBlocked },
        msg
    };
}

const UserServices = {
    updateUserProfile, 
    getMyProfile,
    addImportantDayService,
    addNextMeetService,
    changePasswordService ,

    getAllUserService,
    blockUserService
};
export default UserServices;