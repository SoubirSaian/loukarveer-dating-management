import { Types } from "mongoose";

export interface ICheckIn {
    user: Types.ObjectId;
    feeling: string;
    need: string;
    thinking: string;
    createdAt: Date;
}

export interface IMemory {
    user: Types.ObjectId;
    couple: Types.ObjectId;
    content: string;
    createdAt: Date;
}

export interface ISpark {
    user: Types.ObjectId;
    partner: Types.ObjectId;
    state: string;
    content: string;
    heatLevel: number;
    createdAt: Date;
}

export interface ITempFile {
    user: Types.ObjectId;
    partner: Types.ObjectId;
    file: string;
    viewTimer: number;
    isSeen: boolean,
    seenAt: Date,
    expireAt: Date,
    createdAt: Date;
}

export interface IActivity {
    user: Types.ObjectId;
    couple?: Types.ObjectId;
    category: string;
    content: string;
    status?: string;
    createdAt: Date;
}