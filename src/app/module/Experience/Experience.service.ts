import ApiError from "../../../error/ApiError";
import { deleteDisappearedFile } from "../../../helper/tempFile";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { ENUM_ACTIVITY_STATUS } from "../../../utilities/enum";
import CoupleModel from "../Couple/Couple.model";
import { IActivity, ICheckIn, IMemory, ISpark, ITempFile } from "./Experience.interface";
import {ActivityModel, CheckInModel, MemoryModel, SparkModel, TempFileModel} from "./Experience.model";

//memory
const addMemoryService = async (userDetails: IJwtPayload,payload: {couple: string,content: string}) => {

    const {profileId} = userDetails;

    const newMemory = await MemoryModel.create({
        user: profileId,
        ...payload
    });

    if(!newMemory){
        throw new ApiError(500,"Failed to add new memory.");
    }

    return newMemory;
};

const getmyMemoryService = async (userDetails: IJwtPayload) => {

    const {profileId} = userDetails;

    const memory = await MemoryModel.find({
        user: profileId,
    });

    
    return memory;

};

//activity

const addSharedActivityService = async (userDetails: IJwtPayload,payload: Partial<IActivity>) => {

    const {profileId} = userDetails;

    const newActivity = await ActivityModel.create({
        user: profileId,
        ...payload
    });

    if(!newActivity){
        throw new ApiError(500,"Failed to add new Activity.");
    }

    return newActivity;
};

const getSharedActivityService = async (query: Record<string,unknown>) => {

    // const {profileId} = userDetails;
    const {coupleId} = query;

    const allActivity = await ActivityModel.find({couple: coupleId}).sort({createdAt: -1}).lean();

    return allActivity;
};

const markSharedActivityCompleteService = async (query: Record<string,unknown>) => {

    // const {profileId} = userDetails;
    const {activityId} = query;

    const activity = await ActivityModel.findByIdAndUpdate(activityId,{
        status: ENUM_ACTIVITY_STATUS.DONE
    }, {new: true});

    if(activity.status !== ENUM_ACTIVITY_STATUS.DONE){
        throw new ApiError(500,"Failed to mark activity.");
    }

    return activity;
};

//spark
const addcustomPromptService = async (userDetails: IJwtPayload,payload: Partial<ISpark>) => {

    const {profileId} = userDetails;

    const newPrompt = await SparkModel.create({
        user: profileId,
        ...payload
    });

    if(!newPrompt){
        throw new ApiError(500,"Failed to add new memory.");
    }

    return newPrompt;
};

const sendPromptService = async (query: Record<string,unknown>) => {

    const {promptId,partnerId} = query;

    const prompt = await SparkModel.findByIdAndUpdate(promptId,{
        partner: partnerId
    },{new: true});

    if(!prompt.partner){
        throw new ApiError(500,"Failed to send prompt.");
    }

    //what will happend after sending??
    //will it be disapeared??

    return prompt;
};

const getMyPromptService = async (userDetails: IJwtPayload) => {
    //where to show this my prompt
    const {profileId} = userDetails;

    const prompts = await SparkModel.find({partner: profileId}).sort({createdAt: -1}).lean();

    return prompts;
};

const getAllPromptService = async (userDetails: IJwtPayload) => {

    const {profileId} = userDetails;

    const prompts = await SparkModel.find({user: profileId}).sort({createdAt: -1}).lean();

    return prompts;
};

//disappear file

const sendTemporaryFile = async (
    userDetails: IJwtPayload,
    file: Express.Multer.File | undefined,
    payload: {partner: string, viewTimer: number}
) => {

    const {profileId} = userDetails;

    let tempFile;
    if(file){
        tempFile = `uploads/temp-file/${file.filename}`;
    }

    //create temp file
    const newTempFile = await TempFileModel.create({
        user: profileId,
        partner: payload.partner,
        file: tempFile,
        viewTimer: payload.viewTimer
    });

    if(!newTempFile){
        throw new ApiError(500,"Failed to send disappearing media.")
    }

    return newTempFile;

} 

const getTemporaryFile = async (userDetails: IJwtPayload) => {

    const {profileId} = userDetails;


    //create temp file
    const newTempFile = await TempFileModel.findOne({partner: profileId}).sort({createdAt: -1}).lean();

    if(!newTempFile){
        throw new ApiError(500,"Failed to send disappearing media.")
    }

    return newTempFile;

} 

//auto disapper file
const disappearTemporaryFile = async (query: Record<string,unknown>) => {

    const {tempFileId, viewTimer} = query;

    const EXPIRY_SECONDS: any = viewTimer; // or 30

    const message = await TempFileModel.findById(tempFileId);

    if (!message.isSeen) {
        message.isSeen = true;
        message.seenAt = new Date();

        message.expireAt = new Date(Date.now() +  EXPIRY_SECONDS * 1000);

        await message.save();
    }

    deleteDisappearedFile(tempFileId, EXPIRY_SECONDS + 10);

    return null;

} 




//check in
const addCheckInService = async (userDetails: IJwtPayload, payload: Partial<ICheckIn>) => {

    const {profileId} = userDetails;

    const newCheckIn = await CheckInModel.create({
        user: profileId, ...payload
    });

    if(!newCheckIn){
        throw new ApiError(500,"Check In added.");
    }

    return newCheckIn;

}


const getPartnerCheckInService = async (userDetails: IJwtPayload, query: Record<string,unknown>) => {

    const {profileId} = userDetails;
    const {partnerId} = query;

    // const couple: any = await CoupleModel.findById(coupleId).lean();
    
    //find partners profileId
    // const partnerId = couple?.users?.find( (n: any) => n.toString() !== profileId.toString() );

    const partnerCheckIn = await CheckInModel.findOne({user: partnerId}).sort({createdAt: -1}).lean();

    if(!partnerCheckIn){
        throw new ApiError(500,"Failed to get partner's check in.");
    }

    return partnerCheckIn;

}

const ExperienceServices = { 
    addMemoryService,
    getmyMemoryService,
    addSharedActivityService,
    getSharedActivityService,
    markSharedActivityCompleteService,
    addcustomPromptService,
    sendPromptService,
    getMyPromptService,
    getAllPromptService,
    sendTemporaryFile,
    disappearTemporaryFile,
    getTemporaryFile,
    addCheckInService,
    getPartnerCheckInService,
 };

export default ExperienceServices;