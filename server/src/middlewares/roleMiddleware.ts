import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/express.js";


const authorizeRoles = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.user || !roles.includes(req.user.role)){
        return res.status(403).json({
            success: false,
            message: "Access denied"
        })
    }
    next();
}

export default authorizeRoles