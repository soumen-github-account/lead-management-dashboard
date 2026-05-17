import {z} from "zod"

export const createLeadSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    status: z.enum([
        "New",
        "Contacted",
        "Qualified",
        "Lost",
    ]),
    source: z.enum([
        "Website",
        "Instagram",
        "Referral",
    ]),
    assignedTo: z.string().optional(),
})