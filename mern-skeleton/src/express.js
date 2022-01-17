import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors"
import Template from "../template";
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import postRoutes from "./routes/post.routes"
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(compress())

app.use(helmet())
const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));
app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", postRoutes)

app.use((err, req, res, next) => {

    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
    }
})
app.get("/", (req, res) => {
    res.status(200).send(Template());
})

export default app;