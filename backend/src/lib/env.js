import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const envPath = join(dirname(fileURLToPath(import.meta.url)), "../../.env");
dotenv.config({ path: envPath, quiet: true });
export const ENV = {
    PORT: Number(process.env.PORT) || 5000,
    DB_URL: process.env.DB_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY:process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STREAM_API_SECRET:process.env.STREAM_API_SECRET,
     HACKEREARTH_CLIENT_SECRET: process.env.HACKEREARTH_CLIENT_SECRET
}