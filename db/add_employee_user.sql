INSERT INTO USERS (name, username, hash, admin, email)
VALUES (${name}, ${username}, ${hash}, 'no', ${email})
RETURNING name, username, email, id;


