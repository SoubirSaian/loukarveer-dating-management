import { z } from "zod";

        
const addMemoryValidation = z.object({
    body: z.object({
        content: z.string().min(1,"Memory content is required."),
       
    }),
});

const ExperienceValidations = { 
    addMemoryValidation
 };

export default ExperienceValidations;