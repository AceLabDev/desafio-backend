import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        message: "Crypto API running"
    });
});

export default app;
