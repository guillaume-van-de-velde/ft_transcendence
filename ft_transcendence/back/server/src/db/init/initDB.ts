import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

export async function initDB() {

    const dbPath = path.resolve(__dirname, process.env.DB_PATH!);

    // if (fs.existsSync(dbPath)) {
    //     fs.unlinkSync(dbPath);
    // }
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    await db.run("PRAGMA foreign_keys = ON");

    console.log(`Database: ${dbPath}`);

    return db;
}
