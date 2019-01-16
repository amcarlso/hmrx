INSERT INTO users
(name, username, hash, admin, email)
VALUES
(${name}, ${username}, ${hash}, 'yes', ${email})
RETURNING *;