INSERT INTO punches(punch_in, employee_id)
VALUES (${punchIn}, ${employeeId})
RETURNING *;