UPDATE users
SET paid = 'yes'
WHERE id = ${id}
RETURNING id, name, username, admin, email, phone, paid;