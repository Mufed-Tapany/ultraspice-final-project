-- drop existing users tables
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50) UNIQUE,
    password_hash VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);