import { model, Schema, models } from "mongoose";
import { IActivity, IMemory } from "./Experience.interface";

const MemorySchema = new Schema<IMemory>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
});

const ActivitySchema = new Schema<IActivity>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    category: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
});

export const ActivityModel = models.Activity || model<IActivity>("Activity", ActivitySchema);

export const MemoryModel = models.Memory || model<IMemory>("Memory", MemorySchema);

