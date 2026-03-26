import { Types } from "mongoose";

export interface IDate {
    user: Types.ObjectId;
    couple?: Types.ObjectId;
    city?: string;
    title: string;
    mood: string;
    vibe: string;
    time: string;
    budget?: string;
    venues?: string[];
    timeline?: string[];
    status?: string;
    rating: number;
}

export interface IDatingPayload {
    city: string;
    mood: string;
    vibe: string;
    timeOfDay: string;
    startTime: string;
    budget?: string;
}

/*
city name: Dhaka
current mood state: Romantic
current vibe: Foodie
time of the day: Morning
start time: 10:00 AM
*/