import db from './connection.js'

db.exec(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    verification_code TEXT,
    verified INTEGER DEFAULT 0,
    role TEXT DEFAULT 'USER' CHECK(role IN ('ADMIN', 'USER'))
  )`)

db.run('INSERT INTO users (username,password,email,verification_code,verified,role) VALUES (\'test\',\'123\',\'test@test.com\',\'boo\',\'0\',\'USER\');')
