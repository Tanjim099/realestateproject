import express from "express";
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import projectRoutes from "./routes/projectRouter.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import morgan from "morgan"
import blogRoutes from "./routes/blogRoute.js";
import dotenv from "dotenv";
const app = express();

//configure env
dotenv.config();
app.use(cookieParser());

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and HTTP authentication to be sent cross-origin
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};
app.use(cors(corsOptions));

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
