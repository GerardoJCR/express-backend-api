import dotenv from 'dotenv'
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const HOSTLOCAL = "http://localhost:" + PORT;
export const HOST = "https://api.myminiblog.com";

// para prod (ejemplo)
export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

// Usuario admin inicial (para seed o creación automática)
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


export const IS_PRODUCTION = process.env.IS_PRODUCTION === "true";

console.log(
    `🚀 Running in ${IS_PRODUCTION ? "Production" : "Development"} mode`
);