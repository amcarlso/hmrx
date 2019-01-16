INSERT INTO EMPLOYEES (employee_id, image_url, salary, position, company_id)
VALUES(${userId}, ${image}, ${salary}, ${position}, ${employerId})
RETURNING *;