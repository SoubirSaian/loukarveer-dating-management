import ApiError from "../../../error/ApiError";
import { generateDatingSuggestionFromAI } from "../../../helper/datingSuggestions";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { ENUM_DATE_STATUS } from "../../../utilities/enum";
import UserModel from "../User/User.model";
import { IDate, IDatingPayload } from "./Date.interface";
import DateModel from "./Date.model";
import { suggestionZodSchema } from "./Date.validation";


//dating suggestion service
export const generateSuggestionService = async (
    userDetails: IJwtPayload,
    payload: IDatingPayload,
) => {

    const {profileId} = userDetails;

    // 3. Get couple
    const user: any = await UserModel.findById(profileId).select("partner couple").lean();

    if(!user.couple){
        throw new ApiError(400,"At first you link up with your partner to get dating suggestion.");
    }

    // 1. Call AI
    const aiData = await generateDatingSuggestionFromAI(payload);

    // 2. Validate AI response
    const parsed = suggestionZodSchema.parse(aiData);


    // 4. Save suggestions
    const saved = await DateModel.insertMany(
        parsed.map(item => ({
        ...item,
        user: profileId,
        couple: user?.couple || null
        }))
    );

    return saved;
};

const editDateService = async (query: Record<string,unknown>,payload:{venues?: string[], timeline?: string[]}) => {
    const {dateId} = query;
    const {venues,timeline} = payload;

    const date = await DateModel.findByIdAndUpdate(dateId,{
        venues: venues, 
        timeline: timeline
    },{new: true});

    if(!date){
        throw new ApiError(500,"Failed to edit date.");
    }

    return date;
};


const getAllDateProposal = async (id: string) => {

    // const {dateId} = query;

    const allDate = await DateModel.find({couple: id}).lean();

    // if(date.status !== ENUM_DATE_STATUS.ACCEPTED){
    //     throw new ApiError(500,"Failed to accept date proposal.");
    // }

    return allDate;

};

const getSingleDateProposal = async (id: string) => {

    // const {dateId} = query;

    const date = await DateModel.findById(id).lean();

    if(!date){
        throw new ApiError(500,"Failed to get date proposal.");
    }

    return date;

};

const acceptDateProposal = async (id: string) => {

    // const {dateId} = query;

    const date = await DateModel.findByIdAndUpdate(id,{
        status: ENUM_DATE_STATUS.ACCEPTED
    },{new: true});

    if(date.status !== ENUM_DATE_STATUS.ACCEPTED){
        throw new ApiError(500,"Failed to accept date proposal.");
    }

    return date;

};

const deleteDateProposal = async (id: string) => {

    // const {dateId} = query;

    const date = await DateModel.findByIdAndDelete(id);

    if(!date){
        throw new ApiError(500,"Failed to date date proposal.");
    }

    return date;

};

const provideRating = async (query: Record<string,unknown>) => {
    const {dateId, rating} = query;

    const date = await DateModel.findByIdAndUpdate(dateId,{
        status: ENUM_DATE_STATUS.COMPLETED,
        reting: rating

    },{new: true});

    if(!date.rating){
        throw new ApiError(500,"Failed to add rating.");
    }

    return date;
};

const DateServices = { 
    generateSuggestionService,
    editDateService,
    acceptDateProposal,
    provideRating
 };

export default DateServices;