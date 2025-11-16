import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./database');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )`);
});

export default db;