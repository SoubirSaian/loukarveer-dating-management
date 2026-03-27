import ApiError from "../../../error/ApiError";
import { IJwtPayload } from "../../../interface/jwt.interface";
import { ENUM_COUPLE_STATUS } from "../../../utilities/enum";
import { ConversationModel } from "../Chat/Chat.model";
import UserModel from "../User/User.model";
import { ICouple } from "./Couple.interface";
import CoupleModel from "./Couple.model";

const sendConnectionRequest = async (userDetails: IJwtPayload,payload:{receiverId: string}) => {

    const {profileId} = userDetails;

    //create new couple
    const newCouple = await CoupleModel.create({
        users: [profileId,payload.receiverId],
        requestedBy: profileId,
    });

    if(!newCouple){
        throw new ApiError(500,"Failed to send connection request.");
    }

    return newCouple;

};

const acceptConnectionRequest = async (query:Record<string,unknown>) => {
    //add mongoose transaction id
    const {coupleId} = query;

    const couple = await CoupleModel.findById(coupleId);

    //update both partners
    const [sender,receiver] = await Promise.all([
        UserModel.findByIdAndUpdate(couple.users[0],{couple: couple._id,partner: couple.users[1],isConnected: true},{new: true}),
        UserModel.findByIdAndUpdate(couple.users[1],{couple: couple._id,partner: couple.users[0],isConnected: true},{new: true})
    ]);

    //also create new conversation schema
    const conversation = await ConversationModel.create({
        participants: [couple.users[0], couple.users[1]],
        status: "Accepted"
      });

    //change status
    couple.conversation = conversation._id;
    couple.status = ENUM_COUPLE_STATUS.ACCEPTED;
    couple.startedAt = new Date();
    await couple.save();

    if(couple.status !== ENUM_COUPLE_STATUS.ACCEPTED){
        throw new ApiError(500,"Failed to accept connection request.");
    }

    return couple;

};

const rejectConnectionRequest = async (query:Record<string,unknown>) => {

     const {coupleId} = query;

    const couple = await CoupleModel.findById(coupleId);

    // const [sender,receiver] = await Promise.all([
    //     UserModel.findByIdAndUpdate(couple.users[0],{isConnected: true},{new: true}),
    //     UserModel.findByIdAndUpdate(couple.users[1],{isConnected: true},{new: true})
    // ]);

    //change status
    couple.status = ENUM_COUPLE_STATUS.REJECTED;
    await couple.save();

    if(couple.status !== ENUM_COUPLE_STATUS.REJECTED){
        throw new ApiError(500,"Failed to reject connection request.");
    }

    return couple;

};

const unlinkConnection = async (query:Record<string,unknown>) => {

     const {coupleId} = query;

    const couple = await CoupleModel.findById(coupleId);

    const [sender,receiver] = await Promise.all([
        UserModel.findByIdAndUpdate(couple.users[0],{couple: null,partner: null,isConnected: false},{new: true}),
        UserModel.findByIdAndUpdate(couple.users[1],{couple: null,partner: null,isConnected: false},{new: true})
    ]);

    //change status
    couple.status = ENUM_COUPLE_STATUS.BROKE_UP;
    couple.startedAt = new Date();
    await couple.save();

    if(couple.status !== ENUM_COUPLE_STATUS.BROKE_UP){
        throw new ApiError(500,"Failed to unlink connection.");
    }

    return couple;

};


//dashboard

const dashboardCoupleManagementService = async (query:Record<string,unknown>) => {

    let {page, searchText} = query;

    //total couple and active couple
    const [totalCouple,activeCouple] = await Promise.all([
        CoupleModel.countDocuments({}),
        CoupleModel.countDocuments({status: ENUM_COUPLE_STATUS.ACCEPTED}),
    ]);

    //if searchText is true
    // if(searchText){
    //     const users = await UserModel.find({
    //          $or: [
    //                 { name: { $regex: searchText, $options: "i" } },
    //                 { email: { $regex: searchText, $options: "i" } },
    //             ]
    //     }) .populate({path: "auth", select:"isBlocked"}).lean();

    //     return users;

    // }

    //pagination
    page = parseInt(page as any) || 1;
    let limit = 10;
    let skip = (page as number - 1) * limit;


    const [users, totalUser] = await Promise.all([

        CoupleModel.find({})
            .populate({path: "users", select:"name email image"})
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

const blockCoupleService = async () => {

}

const deleteCoupleService = async (id: string) => {

    const deletedCouple = await CoupleModel.findByIdAndDelete(id);

    //change user status
    const [user1,user2] = await Promise.all([
        UserModel.findByIdAndUpdate(deletedCouple.users[0],{isConnected: false},{new: true}),
        UserModel.findByIdAndUpdate(deletedCouple.users[1],{isConnected: false},{new: true})
    ]);

    return null;
}

const CoupleServices = { 
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    unlinkConnection,
    dashboardCoupleManagementService,
    blockCoupleService,
 };

export default CoupleServices;