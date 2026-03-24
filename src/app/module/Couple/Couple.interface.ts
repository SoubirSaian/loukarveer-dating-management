import { Types } from "mongoose";

export interface ICouple {
    users: Types.ObjectId[];
    conversation: Types.ObjectId;
    status: string;
    requestedBy: Types.ObjectId;
    startedAt: Date
    isBlocked?: boolean;
}