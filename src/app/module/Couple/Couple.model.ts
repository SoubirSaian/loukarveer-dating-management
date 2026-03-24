import { model, Schema, models } from "mongoose";
import { ICouple } from "./Couple.interface";
import { ENUM_COUPLE_STATUS } from "../../../utilities/enum";

const CoupleSchema = new Schema<ICouple>({
    users: [
        { type: Schema.Types.ObjectId, ref: "User", required: true }
        //[senderId,receiverId]
    ],
    conversation:{ type: Schema.Types.ObjectId, ref:"Conversation"},
    status: {
        type: String,
        enum: Object.values(ENUM_COUPLE_STATUS),
        default: ENUM_COUPLE_STATUS.PENDING
    },

    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    startedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const CoupleModel = models.Couple || model<ICouple>("Couple", CoupleSchema);

export default CoupleModel;