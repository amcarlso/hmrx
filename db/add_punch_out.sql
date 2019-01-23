UPDATE punches
SET punch_out = ${punchOut}
WHERE employee_id = ${employeeId} AND punch_out is null
RETURNING *;