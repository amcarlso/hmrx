UPDATE users
SET paid = 'yes'
WHERE id = ${userId}
RETURNING id, name, username, admin, email, phone, paid;