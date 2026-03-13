import { Types } from "mongoose";

export interface IAuth {
    profile: Types.ObjectId;
    email: string;
    name?: string;
    password: string;
    verificationCode: string;
    isEmailVerified: boolean;
    isBlocked: boolean;
}

export type TRegisterUser = {
    name : string;
    email: string;
    city: string;
    firstMeet: Date;
    isLongDistance: boolean;
    password: string;
    confirmPassword: string;
}

export interface TLoginUser {
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    newPassword: string;
    confirmPassword: string;
}