CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    username VARCHAR(35),
    hash TEXT,
    admin TEXT
);

CREATE TABLE employees
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES users(id),
    image_url TEXT,
    salary NUMERIC(5, 2),
    position TEXT,
    company_id INTEGER REFERENCES users(id)
);