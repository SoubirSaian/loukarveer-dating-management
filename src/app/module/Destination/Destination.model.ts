import { model, Schema, models } from "mongoose";
import { IDestination } from "./Destination.interface";
import { ENUM_DESTINATION_STATUS } from "../../../utilities/enum";

const DestinationSchema = new Schema<IDestination>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    note: { type: String },
    photos: [{
        type: String,
        default: ''
    }],
    status: {
        type: String, 
        enum: Object.values(ENUM_DESTINATION_STATUS), 
        default: ENUM_DESTINATION_STATUS.UPCOMING
    }
}, { timestamps: true });

const DestinationModel = models.Destination || model<IDestination>("Destination", DestinationSchema);

export default DestinationModel;