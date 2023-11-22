import express from "express";
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import projectRoutes from "./routes/projectRouter.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
const app = express();


app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: `WELCOME REAL ESTATE...`
    });
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/project", projectRoutes);

app.all('*', (req, res) => {
    return res.status(404).json({
        message: `oops!page not found...`
    });
});

app.use(errorMiddleware);

export default app;
