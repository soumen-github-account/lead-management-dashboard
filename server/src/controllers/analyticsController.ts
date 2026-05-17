import type { Request, Response } from "express";
import Lead from "../models/LeadModel.js";


export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const totalLeads = await Lead.countDocuments({
            isDeleted: false,
        });

        const newLeads = await Lead.countDocuments({
            status: "New",
            isDeleted: false,
        });

        const contactedLeads = await Lead.countDocuments({
            status: "Contacted",
            isDeleted: false,
        });

        const qualifiedLeads = await Lead.countDocuments({
            status: "Qualified",
            isDeleted: false,
        });

        const lostLeads = await Lead.countDocuments({
            status: "Lost",
            isDeleted: false,
        });

        const websiteLeads = await Lead.countDocuments({
            source: "Website",
            isDeleted: false,
        });

        const instagramLeads = await Lead.countDocuments({
            source: "Instagram",
            isDeleted: false,
        });

        const referralLeads = await Lead.countDocuments({
            source: "Referral",
            isDeleted: false,
        });

        res.status(200).json({
            success: true,
            data: {
                totalLeads,

                statusAnalytics: {
                    newLeads,
                    contactedLeads,
                    qualifiedLeads,
                    lostLeads,
                },

                sourceAnalytics: {
                    websiteLeads,
                    instagramLeads,
                    referralLeads,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Analytics Fetch Failed",
        });
    }
};