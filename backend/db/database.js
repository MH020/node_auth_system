import db from './connection.js';

db.exec(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK( role IN ("ADMIN", "USER") )
  )`);


  db.run(`INSERT INTO users (username,password,email,role) VALUES ('test','123','test@test.com', 'USER');`);

