import type { Request, Response } from "express";

import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { log } from "console";
import { loginSchema, registerSchema } from "../validators/authValidator.js";


export const register = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const validatedData = registerSchema.parse(req.body);

        const { name, email, password, role } = validatedData

        const userExist = await User.findOne({email});

        if(userExist) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const token = generateToken(user._id.toString());
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "server Error"
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { email, password } = validatedData;
        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
            return;
        }

        const check = await bcrypt.compare(password, user.password)
        if(!check){
            res.status(400).json({
                success: false,
                message: "Invalide Password"
            })
            return;
        }

        const token = generateToken(user._id.toString());
        res.status(200).json({
            success: true,
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: "Login successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server Error"
        })
    }
}

export const getUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById((req as any).user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}