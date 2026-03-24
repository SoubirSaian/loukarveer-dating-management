import ApiError from "../../../error/ApiError";
import { Express } from "express";
import {  IChangePassword, IUser, TaddDate } from "./User.interface";
import UserModel from "./User.model";
import { JwtPayload } from "jsonwebtoken";
import deleteOldFile from "../../../utilities/deleteFile";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { email } from "zod";
import AuthModel from "../auth/auth.model";



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

//add desire mood
const addDesireMood = async (userDetails:IJwtPayload,payload:{imoji: string,mood: string}) => {

    const {profileId} = userDetails;

    const profile = await UserModel.findByIdAndUpdate(profileId,{
        desireMood: payload
    });

    if(!profile?.desireMood?.mood){
        throw new ApiError(500,"Failed to add desire mood.");
    }

    return profile.desireMood;
}


//dashboard

const getAllUserService = async (query: Record<string,unknown>) => {

    let {page, searchText} = query;

    //if searchText is true
    if(searchText){
        const users = await UserModel.find({
             $or: [
                    { name: { $regex: searchText, $options: "i" } },
                    { email: { $regex: searchText, $options: "i" } },
                ]
        }) .populate({path: "auth", select:"isBlocked"}).lean();

        return users;

    }

    //pagination
    page = parseInt(page as any) || 1;
    let limit = 10;
    let skip = (page as number - 1) * limit;


    const [users, totalUser] = await Promise.all([

        UserModel.find({})
            .populate({path: "auth", select:"isBlocked"})
                .sort({createdAt: -1})
                    .skip(skip).limit(limit)
                        .lean(),
    
        UserModel.countDocuments({})
    ])

    const totalPage = Math.ceil(totalUser / limit);

    return {
        meta:{page,limit: 10,total: totalUser, totalPage},
        users
    };
}

const blockUserService = async (id: string) => {
    
    // if(!authId){
    //     throw new ApiError(400,"User id is required to block a user");
    // }

    const auth = await AuthModel.findById(id);

    if(!auth){
        throw new ApiError(404,"User not found to block.");
    }

    auth.isBlocked = !auth.isBlocked;

    let msg = auth.isBlocked ? "User has been blocked." : "User has been unblocked.";

    await auth.save();

    return {
        user: { name: auth.name, email: auth.email, isBlocked: auth.isBlocked },
        msg
    };
}

const UserServices = {
    updateUserProfile, 
    getMyProfile,
    addImportantDayService,
    addNextMeetService,
    changePasswordService ,
    addDesireMood,
    getAllUserService,
    blockUserService
};
export default UserServices;