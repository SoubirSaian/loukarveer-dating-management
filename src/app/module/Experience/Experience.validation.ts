import { z } from "zod";

        
const addMemoryValidation = z.object({
    body: z.object({
        content: z.string().min(1,"Memory content is required."),
       
    }),
});

const addCheckInValidation = z.object({
    body: z.object({
        feeling: z.string().min(1,"Check In feeling is required."),
        mood: z.string().min(1,"Check In mood is required."),
        mine: z.string().min(1,"Check In mine is required."),
       
    }),
});

const addSharedActivityValidation = z.object({
    body: z.object({
        couple: z.string().min(24,"Couple Id is required."),
        category: z.string().min(1,"Category is required."),
        content: z.string().min(1,"Content is required."),
       
    }),
});

const addPromptValidation = z.object({
    body: z.object({
        state: z.string().min(24,"State is required."),
        content: z.string().min(1,"Content is required."),
        heatLevel: z.number().min(1,"Heat level is required."),
       
    }),
});

const addTempFileValidation = z.object({
    body: z.object({
        partner: z.string().min(24,"Partner id is required."),
        viewTimer: z.number().min(1,"View timer is required."),
    }),
});

const ExperienceValidations = { 
    addMemoryValidation,
    addCheckInValidation,
    addSharedActivityValidation,
    addPromptValidation,
    addTempFileValidation
 };

export default ExperienceValidations;