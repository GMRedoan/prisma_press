import cookieParser from "cookie-parser";
import express, {Application, Request, Response} from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";

const app : Application = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use(cors({
    origin : config.app_url,
    credentials : true
}));

app.get("/", async (req : Request, res : Response) => {
    res.send("hello, world")
})

app.use("/api/auth", authRouter);
 
app.use("/api/users", userRouter);

export default app;