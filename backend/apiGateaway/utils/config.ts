require("dotenv").config();

export const PORT = process.env.PORT as string;
export const REDIS_URL = process.env.REDIS_URL as string;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const BASE_URL = process.env.BASE_URL as string;
export const SSL_KEY_FILE = process.env.SSL_KEY_FILE as string;
export const SSL_CRT_FILE = process.env.SSL_CRT_FILE as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;
