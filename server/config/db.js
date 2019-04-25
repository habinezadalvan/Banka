
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// DATABASE CONNECTION
if (process.env === 'production') {
  module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
if (process.env === 'development') {
  module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
if (process.env === 'test') {
  module.exports = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
  });
} else {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  pool.on('connect', () => {
    console.log('App has connected to database successfully');
  });
  module.exports = pool;
}
