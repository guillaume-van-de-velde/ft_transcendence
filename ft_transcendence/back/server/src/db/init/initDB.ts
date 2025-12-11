import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function initDB() {

    const dbPath = path.resolve(__dirname, process.env.DB_PATH!);

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    await db.run("PRAGMA foreign_keys = ON");

    console.log(`Database: ${dbPath}`);

    return db;
}
