SELECT * FROM users
LEFT JOIN employees ON users.id = employee_id
where company_id = ${id};
