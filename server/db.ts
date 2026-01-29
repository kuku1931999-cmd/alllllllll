import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing. Please enable the Replit Database tool.",
  );
}

// قمنا بإضافة كلمة export هنا لحل المشكلة
export const client = postgres(process.env.DATABASE_URL);
export const pool = client;
export const db = drizzle(client, { schema });
