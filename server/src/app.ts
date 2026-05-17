import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import leadRoutes from "./routes/leadRoute.js"
import analyticsRoutes from "./routes/analyticsRoute.js"

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import logger from "./utils/logger.js";

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true
//     })
// )

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,

//     max: 100,

//     message: "Too many requests",
// });

// app.use(limiter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
// Routes
app.use("/api/auth", authRoute)
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get('/', (req, res) => {
    res.send("Api is running...")
})


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorMiddleware)
export default app;