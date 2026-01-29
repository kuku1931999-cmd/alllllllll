import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

/**
 * We attempt to get the DATABASE_URL from process.env.
 * In Replit, secrets like DATABASE_URL are automatically injected into the environment.
 */
const databaseUrl = process.env.DATABASE_URL;

function createClient() {
  if (!databaseUrl || databaseUrl.trim() === "") {
    console.error("CRITICAL ERROR: DATABASE_URL is missing or empty in process.env.");
    
    if (process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER && process.env.PGPASSWORD) {
      console.log("Attempting fallback connection using individual PG environment variables...");
      return postgres({
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT) || 5432,
        connect_timeout: 10,
        idle_timeout: 20,
      });
    } else {
      throw new Error("DATABASE_URL is missing. Please enable the Replit Database tool or set the Secret correctly.");
    }
  }

  return postgres(databaseUrl, {
    connect_timeout: 10,
    idle_timeout: 20,
  });
}

export const client = createClient();
export const pool = client;
export const db = drizzle(client, { schema });
