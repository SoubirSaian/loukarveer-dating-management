import ApiError from "../../../error/ApiError";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { IMemory } from "./Experience.interface";
import {MemoryModel} from "./Experience.model";

const addMemoryService = async (userDetails: IJwtPayload,payload: {content: string}) => {

    const {profileId} = userDetails;

    const newMemory = await MemoryModel.create({
        user: profileId,
        content: payload.content
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

const ExperienceServices = { 
    addMemoryService,
    getmyMemoryService
 };

export default ExperienceServices;