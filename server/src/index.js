import { config } from "dotenv";
import { connDb } from "./config/db.js";
import { app } from "./app.js";

// .env config
config();

const port = process.env.PORT || 5000;

connDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening live on port:${port}`);
        });
    })
    .catch((error) => {
        console.log(`Database Connection Error: ${error}`);
    });