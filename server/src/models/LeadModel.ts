

import mongoose from "mongoose";
import type { ILead } from "../interface/ILead.js";

const leadSchema = new mongoose.Schema<ILead>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    status: {type: String, enum: ["New", "Contacted", "Qualified", "Lost"], default: "New"},
    source: {
        type: String,
        enum: ["Website", "Instagram", "Referral"],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

leadSchema.index({
    name: "text",
    email: "text"
})

const Lead = mongoose.model<ILead>("Lead", leadSchema)

export default Lead