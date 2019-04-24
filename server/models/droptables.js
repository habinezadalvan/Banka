import pool from '../config/db';

const deleteQuery = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS transactions`;

pool.query(deleteQuery).then(() => {
  console.log('Deleted tables successfully');
  // pool.end();
}).catch((err) => {
  console.log(err);
  process.exit(0);
});
