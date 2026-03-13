import { Types } from "mongoose";

export interface IUser {
    
  
  auth: Types.ObjectId;
  email: string;
  name: string;
  city: string;
  image: string;
  firstMeet: Date;
  isLongDistance: boolean;
  subscription: {
        isSubscribed: boolean;
        subscribedAt: Date;
        expiredAt: Date;
    };

}





export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// export interface IUserRole {

// }