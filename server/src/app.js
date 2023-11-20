import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/',(req,res) => {
    return res.status(200).json({
        message:`WELCOME REAL ESTATE...`
    });
});

app.all('*',(req,res) => {
    return res.status(404).json({
        message:`oops!page not found...`
    });
});


export default app;
