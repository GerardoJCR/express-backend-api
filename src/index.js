import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './db/db.js'
import { createAdmin } from "./libs/createAdmin.js"
import { PORT } from "./config.js"

dotenv.config();


const startServer = async () => {
    try {
        await connectDB();         // conectar a Mongo
        await createAdmin();       // crear admin automáticamente si no existe
        app.listen(PORT, () => {
            console.log("🚀 Server running on port", PORT);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};

startServer();