import mongoose, { Schema } from "mongoose";
import type { IUser } from "../interface/IUser.js";

const UserSchema = new Schema<IUser> (
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "sales", "leader"],
            default: "sales"
        },
        managedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            default: null,
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<IUser>("Users", UserSchema);
export default User;