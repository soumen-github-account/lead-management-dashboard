import type { Request, Response, NextFunction } from "express";

import { ZodError } from "zod";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if(err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            errors: err.issues,
        })
    }
    res.status(500).json({
        success: false,
        message: err.message || "Server Error",
    });
}

export default errorMiddleware;