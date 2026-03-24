import { z } from "zod";

        
const createDestinationValidation = z.object({
    body: z.object({
        couple: z.string().min(24,"Couple Id is required."),
        city: z.string().min(1,"City name is required."),
        latitude: z.number().min(1,"City latitude is required."),
        longitude: z.number().min(1,"City longitude is required."),
        note: z.string().min(1, "Note is required."),
        status: z.string().min(1,"Status is required."),
    }),
});

const DestinationValidations = { 
    createDestinationValidation
 };

export default DestinationValidations;