INSERT INTO users
(name, username, hash, admin, email, phone)
VALUES
(${name}, ${username}, ${hash}, 'yes', ${email}, ${phone})
RETURNING id, name, username, admin, email, phone;