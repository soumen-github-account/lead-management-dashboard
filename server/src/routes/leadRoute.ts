import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { createLead, deleteLead, exportLeadsCSV, getAllUsers, getLeads, getUsers, updateLead } from "../controllers/leadController.js"
import authorizeRoles from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.post("/", protect, createLead)
router.get("/", protect, getLeads)
router.put("/:id", protect, updateLead);
router.get("/users", protect, getUsers);
router.get("/get-all-users", protect, getAllUsers);

router.delete("/:id", protect, authorizeRoles("admin"), deleteLead);
router.get("/export/csv", protect, exportLeadsCSV)

export default router