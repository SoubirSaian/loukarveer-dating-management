import { Types } from "mongoose";

export interface IFuturePlan {
    user: Types.ObjectId;
    label: string;
    description: string;
    steps: Object[]
    completionPercentage: number
    isPrivate: boolean
}