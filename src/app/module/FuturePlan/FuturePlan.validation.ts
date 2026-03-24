import { z } from "zod";

        
const addNewFuturePlanValication = z.object({
    body: z.object({
        couple: z.string().min(24,"Couple Id is requered."),
        label: z.string().min(1,"Plan name is requered."),
        description: z.string().min(1,"Plan description is required."),
        
    }),
});

const addNewStepValication = z.object({
    body: z.object({
        content: z.string().min(1,"Step content is requered."),
        
    }),
});

const FuturePlanValidations = { 
    addNewFuturePlanValication,
    addNewStepValication
 };

export default FuturePlanValidations;