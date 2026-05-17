import { success } from "zod";
import Lead from "../models/LeadModel.js";
import type { AuthRequest } from "../types/express.js";
import type { Response } from "express";
import { createLeadSchema } from "../validators/leadValidator.js";
import { createObjectCsvWriter } from "csv-writer";

import path from "path";
import User from "../models/UserModel.js";

export const createLead = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = createLeadSchema.parse(req.body);
        const {
            name,
            email,
            status,
            source,
            assignedTo,
        } = validatedData;
        const lead = await Lead.create({
            name,
            email,
            status,
            source,
            assignedTo: assignedTo || undefined,
            createdBy: req.user?._id,
        });

        res.status(201).json({
            success: true,
            message: "Lead created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server Error"
        })
    }
}

export const getLeads = async (req: AuthRequest, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const status = req.query.status || "";
        const source = req.query.source || "";
        const sort = req.query.sort === "oldest" ? 1 : -1;

        const query : any = {
            isDeleted: false
        }

        if (source) {
            query.source = source;
        }
        if (status) {
            query.status = status;
        }

        if(search){
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        if(req.user.role === "sales") {
            query.assignedTo = req.user._id;
        }

        const leads = await Lead.find(query).sort({ createdAt: sort }).skip(skip).limit(limit);

        const total = await Lead.countDocuments(query)
        res.status(200).json({
            success: true,
            data: leads,
            pagination: {
                page,
                pages: Math.ceil(total / limit),
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const getSingleLead = async(req: AuthRequest, res: Response) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if(!lead){
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        res.status(200).json({
            success: true,
            data: lead
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const updateLead = async(req: AuthRequest, res: Response) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if(!lead){
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }

        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).json({
            success: true,
            message: "Lead Updated",
            data: updatedLead
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const deleteLead = async(req: AuthRequest, res: Response) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
        const lead = await Lead.findById(req.params.id);
        if(!lead){
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            })
        }
        lead.isDeleted = true;
        await lead.save()
        
        res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Server Error"
        })
    }
}



export const exportLeadsCSV = async(req: AuthRequest, res: Response) => {
    try {
        const leads = await Lead.find({isDeleted: false})

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, "../../leads.csv"),

            header: [
                { id: "name", title: "NAME" },

                { id: "email", title: "EMAIL" },

                { id: "status", title: "STATUS" },

                { id: "source", title: "SOURCE" },
            ],
        })
        await csvWriter.writeRecords(leads);
        res.download("leads.csv");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "CSV Export Failed",
        });
    }
}

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {

  const users =
    await User.find({
      role: "sales",
    });

  res.json({
    success: true,
    data: users,
  });
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
) => {

  const users =
    await User.find({});

  res.json({
    success: true,
    data: users,
  });
};