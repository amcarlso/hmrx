select * from users

join employees 
on users.id = employee_id
WHERE employee_id = ${id};

--  id, name, username, admin, company_id, email, employee_id, image_url, position, salary 