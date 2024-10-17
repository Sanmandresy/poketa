import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "./schema";

const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL ?? "database.db";
const expo = openDatabaseSync(databaseUrl, { enableChangeListener: true });
export const database = drizzle(expo, { schema });
