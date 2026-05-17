
import express from "express"
import { getUser, login, register } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/me", protect, getUser)
router.get("/admin", authorizeRoles("admin"), (req, res) => {
    res.json({success: true, message: "Welcome to Admin."})
})
export default router