import { db } from "../../../server";

export async function initTableUsers() {
    await db.exec(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            picture TEXT,
            language TEXT NOT NULL,
            mode TEXT NOT NULL,
            tournament DEFAULT 0,
            general INTEGER,
            noises INTEGER,
            music INTEGER,
            player1KeyUp TEXT,
            player1KeyDown TEXT,
            player2KeyUp TEXT,
            player2KeyDown TEXT,
            friends TEXT,
            blocked TEXT,
            version INTEGER
        )
    `)
}

export async function initTableStats() {
    await db.exec(`
        CREATE TABLE stats (
            idPlayer INTEGER UNIQUE NOT NULL,
            played INTEGER,
            wins INTEGER,
            loses INTEGER,
            tournaments INTEGER,
            winsTournaments INTEGER,

            FOREIGN KEY (idPlayer) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    `)
}

export async function initTablePrivateMessages() {
    await db.exec(`
        CREATE TABLE privateMessages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idTransmitter INTEGER NOT NULL,
            idReceiver INTEGER NOT NULL,
            message TEXT,
            seen BOOLEAN,

            FOREIGN KEY (idTransmitter) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

            FOREIGN KEY (idReceiver) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    `)
}

export async function initTableGlobalMessages() {
    await db.exec(`
        CREATE TABLE globalMessages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idTransmitter INTEGER NOT NULL,
            message TEXT,

            FOREIGN KEY (idTransmitter) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    `)
}

export async function initTableNotify() {
    await db.exec(`
        CREATE TABLE notify (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idTransmitter INTEGER NOT NULL,
            idReceiver INTEGER NOT NULL,
            type TEXT NOT NULL,
            seen BOOLEAN,

            FOREIGN KEY (idTransmitter) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

            FOREIGN KEY (idReceiver) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    `)
}

export async function initTableTournaments() {
    await db.exec(`
        CREATE TABLE tournaments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            status TEXT NOT NULL,
            mode TEXT NOT NULL,
            id1 INTEGER,
            id2 INTEGER,
            id3 INTEGER,
            id4 INTEGER,
            id5 INTEGER,
            id6 INTEGER,
            id7 INTEGER,
            id8 INTEGER,
            lv1 INTEGER,
            lv2 INTEGER,
            lv3 INTEGER,
            lv4 INTEGER,
            lv5 INTEGER,
            lv6 INTEGER,
            lv7 INTEGER,
            lv8 INTEGER
        )
    `)
}

export async function initTableMatches() {
    await db.exec(`
        CREATE TABLE matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idPlayer1 INTEGER NOT NULL,
            idPlayer2 INTEGER NOT NULL,
            pointsPlayer1 INTEGER,
            pointsPlayer2 INTEGER,
            mode TEXT NOT NULL,
            date TEXT NOT NULL,
            hour TEXT NOT NULL,

            FOREIGN KEY (idPlayer1) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

            FOREIGN KEY (idPlayer2) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    `)
}

export async function initTables() {
    await initTableUsers();
    await initTableStats();
    await initTablePrivateMessages();
    await initTableGlobalMessages();
    await initTableNotify();
    await initTableTournaments();
    await initTableMatches();
}