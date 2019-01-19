UPDATE users
SET paid = 'yes'
WHERE id = ${userId}
RETURNING *;