UPDATE employees
SET salary = ${salary}
where employee_id = ${employeeId}
returning *;