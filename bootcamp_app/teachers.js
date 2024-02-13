const { Pool } = require('pg');

const pool = new Pool ({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
})

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name LIKE $1 
ORDER BY teacher;
`;

const cohortName = process.argv[2] || JUL02;
const values = [`%${cohortName}%`];

pool.query(queryString, values)
  .then(res => {
      res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`);
      })
    }).catch(err => console.error('query error', err.stack));