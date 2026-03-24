import ApiError from "../../../error/ApiError";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { IDestination } from "./Destination.interface";
import DestinationModel from "./Destination.model";

const addDestinationService = async (userDetails:IJwtPayload,payload: Partial<IDestination>) => {

    const {profileId} = userDetails;

    const newDestination = await DestinationModel.create({
        user: profileId, ...payload
    });

    if(!newDestination){
        throw new ApiError(500,"Failed to add new destination.");
    }

};

const getMyDestinationService = async (userDetails:IJwtPayload, query: Record<string,unknown>) => {

    const {profileId} = userDetails;

    const {coupleId,status} = query;

    let filter: any = {
        couple: coupleId
    };

    if(status) filter.status = status;

    const myDestination = await DestinationModel.find(filter).sort({createdAt: -1}).lean();

    return myDestination;

}

const addPhotoService = async (
    userDetails:IJwtPayload, 
    files: Express.Multer.File[],
    id: string
) => {

    // const {profileId} = userDetails;
    let newImages: string[] = [];

    const destination = await DestinationModel.findById(id);

    if (files){
         newImages = files?.map((file) => `uploads/destination-image/${file.filename}`);

         destination.photos = newImages;

         await destination.save();
    }

    return null;

}

const DestinationServices = { 
    addDestinationService,
    getMyDestinationService,
    addPhotoService
 };

export default DestinationServices;