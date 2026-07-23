import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:");
        console.error(error);
    });
