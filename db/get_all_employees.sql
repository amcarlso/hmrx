select users.id, name, username, admin, email, paid, employee_id, employee_id, image_url, salary, position, company_id from users
join employees
on users.id = employee_id
where company_id = ${id};
