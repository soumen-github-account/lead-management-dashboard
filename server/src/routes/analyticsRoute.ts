import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { getAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getAnalytics);

export default router;