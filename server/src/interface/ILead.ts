import type { Types } from "mongoose";

export interface ILead{
    name: string;
    email: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    source: "Website" | "Instagram" | "Referral";
    createdBy: Types.ObjectId;

    assignedTo?: Types.ObjectId | undefined;
    leaderId?: Types.ObjectId
    isDeleted: boolean;
}
