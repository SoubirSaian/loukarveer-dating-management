import { model, Schema, models } from "mongoose";
import { IDate } from "./Date.interface";
import { ENUM_DATE_STATUS } from "../../../utilities/enum";

const DateSchema = new Schema<IDate>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    couple: { type: Schema.Types.ObjectId, required: true, ref: "Couple" },

    city: { type: String, default: '' },
    title: { type: String, required: true },
    mood: { type: String , required: true},
    vibe: { type: String, required: true },
    time: { type: String, required: true },
    budget: { type: String, required: true },

    venues: [{ type: String, default: "" }],
    timeline: [{ type: String, default: "" }],

    status: { 
        type: String, 
        enum: Object.values(ENUM_DATE_STATUS),
        default: ENUM_DATE_STATUS.PROPOSED
    },
    rating: {type: Number, default: 0}
}, { timestamps: true });

const DateModel = models.DatingSuggestions || model<IDate>("DatingSuggestions", DateSchema);

export default DateModel;