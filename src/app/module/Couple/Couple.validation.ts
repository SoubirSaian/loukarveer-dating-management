import { z } from "zod";

        
const u = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const CoupleValidations = { u };

export default CoupleValidations;