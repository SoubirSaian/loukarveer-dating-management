import { z } from "zod";

        
const addDateValication = z.object({
    body: z.object({
        couple: z.string().min(24,"Couple Id is required."),
        city: z.string().min(1,"City name is required.").optional(),
        title: z.string().min(1,"Title is required."),
        mood: z.string().min(1,"Mood is required."),
        vibe: z.string().min(1,"Vibe is required."),
        time: z.string().min(1,"time is required."),
        venues: z.array(z.string().default("")).default([]),
        timeline: z.array(z.string().default("")).default([]),
        // status: z.string().min(1,"Title is required."),
        
    }),
});


export const suggestionZodSchema = z.array(
  z.object({
    city: z.string(),
    title: z.string(),
    mood: z.string(),
    vibe: z.string(),
    time: z.string(),
    budget: z.string(),
    venues: z.array(z.string()),
    timeline: z.array(z.string())
  })
);

const DateValidations = { 
    addDateValication,
    suggestionZodSchema
 };

export default DateValidations;