UPDATE users
SET paid = 'yes'
WHERE id = ${id}
RETURNING *;