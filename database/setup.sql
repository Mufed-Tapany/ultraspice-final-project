-- -- drop existing reset_password tables
DROP TABLE IF EXISTS reset_password;

-- -- drop existing users tables
DROP TABLE IF EXISTS users;

-- drop existing users orders
DROP TABLE IF EXISTS orders;

CREATE TABLE users (
    id SERIAL primary key,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50) UNIQUE,
    password_hash VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_password (
    id SERIAL primary key,
    email VARCHAR(50) REFERENCES users (email),
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
     id SERIAL primary key,
     userId INTEGER NOT NULL REFERENCES users (id),
     image TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  first_name VARCHAR(100) REFERENCES users (first_name),
--  last_name VARCHAR(100) REFERENCES users (last_name),
--  email VARCHAR(50) REFERENCES users (email),