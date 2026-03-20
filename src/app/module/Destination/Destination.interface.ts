import { Types } from "mongoose";

export interface IDestination {
    user: Types.ObjectId;
    city: string;
    latitude: number;
    longitude: number;
    note: string;
    photos: string[];
    status: string;
}