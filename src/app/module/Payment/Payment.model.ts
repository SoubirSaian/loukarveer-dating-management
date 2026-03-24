import { model, Schema, models } from "mongoose";
import { IPayment } from "./Payment.interface";

const PaymentSchema = new Schema<IPayment>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    profile_image: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 0 }
}, { timestamps: true });

const PaymentModel = models.Payment || model<IPayment>("Payment", PaymentSchema);

export default PaymentModel;