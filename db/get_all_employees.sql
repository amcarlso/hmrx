SELECT * FROM users
JOIN employees ON users.id = employee_id
where company_id = ${id};
