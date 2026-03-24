import { model, Schema, models } from "mongoose";
import { IDate } from "./Date.interface";

const DateSchema = new Schema<IDate>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const DateModel = models.Date || model<IDate>("Date", DateSchema);

export default DateModel;