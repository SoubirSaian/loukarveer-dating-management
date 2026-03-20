import { Types } from "mongoose";

export interface IMemory {
    user: Types.ObjectId;
    content: string;
    createdAt: Date;
}

export interface IActivity {
    user: Types.ObjectId;
    category: string;
    content: string;
    createdAt: Date;
}