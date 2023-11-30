import express from "express";
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import projectRoutes from "./routes/projectRouter.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import morgan from "morgan"
import blogRoutes from "./routes/blogRoute.js";
import { config } from "dotenv";
const app = express();

config();

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    return res.status(200).json({
        message: `WELCOME REAL ESTATE...`
    });
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/blog", blogRoutes);

app.all('*', (req, res) => {
    return res.status(404).json({
        message: `oops!page not found...`
    });
});

app.use(errorMiddleware);

export default app;
