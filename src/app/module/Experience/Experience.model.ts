import { model, Schema, models } from "mongoose";
import { IActivity, ICheckIn,  IMemory, ISpark, ITempFile } from "./Experience.interface";
import { ENUM_ACTIVITY_STATUS, ENUM_SPARK_STATUS } from "../../../utilities/enum";

//memory model
const MemorySchema = new Schema<IMemory>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
});

//Check in model
const CheckInSchema = new Schema<ICheckIn>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    feeling: { type: String, required: true },
    need: { type: String, required: true },
    mine: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
});

//Spark model
const SparkSchema = new Schema<ISpark>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    state: { 
        type: String, 
        enum: Object.values(ENUM_SPARK_STATUS),
        default: ENUM_SPARK_STATUS.ROMANTIC
    },
    content: { type: String, required: true },
    heatLevel: { type: Number, required: true },
    createdAt: {type: Date, default: Date.now}
});

//Spark model
const disappearContentSchema = new Schema<ITempFile>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    file: { type: String, required: true },
    viewTimer: { type: Number, default: 10 },
    createdAt: {type: Date, default: Date.now}
});

//Activity model
const ActivitySchema = new Schema<IActivity>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    couple: { type: Schema.Types.ObjectId, required: true, ref: "Couple" },
    category: { type: String, required: true },
    content: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(ENUM_ACTIVITY_STATUS),
        default: ENUM_ACTIVITY_STATUS.IN_PROGRESS
    },
    createdAt: {type: Date, default: Date.now}
});

export const ActivityModel = models.Activity || model<IActivity>("Activity", ActivitySchema);

export const CheckInModel = models.CheckIn || model<ICheckIn>("CheckIn", CheckInSchema);

export const SparkModel = models.Spark || model<ISpark>("Spark", SparkSchema);

export const TempFileModel = models.TemporaryFile || model<ITempFile>("TemporaryFile", disappearContentSchema);

export const MemoryModel = models.Memory || model<IMemory>("Memory", MemorySchema);

