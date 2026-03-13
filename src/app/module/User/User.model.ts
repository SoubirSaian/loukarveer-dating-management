import { model, models, Schema } from "mongoose";
import { IUser } from "./User.interface";



const UserSchema = new Schema<IUser>({
    auth: { type: Schema.Types.ObjectId, ref: "Auth" },
    name: {
        type: String,
        default: '',
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        required: [true,"email is required"],
    },
    // phone: {
    //     type: String,
    //     default: ''
    // },
    image: {
            type: String,
            default: ''
        },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         default: "Point"
    //     },
    //     coordinates: {
    //         type: [Number], // [longitude, latitude]
    //         // required: true
    //         default: [0, 0]
    //     }
            
    // },
    firstMeet:[{
        type: Date,
        // default: null
    }],
    
    city:{
        type: String,
        default: ''
    },
    // country:{
    //     type: String,
    //     default: ''
    // },
    isLongDistance: {
        type: Boolean,
        default: false
    },
    subscription: {
        isSubscribed: { type: Boolean, default: false },
        subscribedAt: { type: Date, default: null },
        expiredAt: { type: Date, default: null }
    },
    
    
}, { timestamps: true });



const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;