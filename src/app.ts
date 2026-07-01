import cookieParser from "cookie-parser";
import express, {Application, Request, Response} from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentsRouter } from "./modules/comment/comment.route";
import { notFound } from "./middleware/notFound";
import { globalError } from "./middleware/globalError";
import { subscriptionRouter } from "./modules/subscription/subscription.route";

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
app.use("/api/posts", postRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/subscription", subscriptionRouter);


app.use(notFound);

app.use(globalError);

export default app;