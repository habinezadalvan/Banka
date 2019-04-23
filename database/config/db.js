
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// DATABASE CONNECTION
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('App has connected to database successfully');
});

export default pool;

if (process.env.NODE_ENV){
  
}