import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// Middlewares
import { errorMiddleware } from "./middlewares/error.middleware.js";
// Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

const corsOptions = {
    credentials: true,
    origin:
        process.env.NODE_ENV === "production"
            ? "http://localhost:3000"
            : "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
// For url inputs
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.disable("x-powered-by");

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// Custom middleware for errors
app.use(errorMiddleware);

export { app };