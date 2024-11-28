import { Pool } from "pg";
import 'dotenv/config';

// const { DB_HOST, DB_USER, DB_PSW, DB_DATABASE, DB_PORT } = process.env;

// const pool = new Pool({
//     user: DB_USER,
//     host: DB_HOST,
//     database: DB_DATABASE,
//     password: DB_PSW,
//     port: Number(DB_PORT),
// });

// async function sendQuery(query = '', values?: any[]) {
//     const results: any = await pool.query(query, values);

//     return results;
// }

// export { sendQuery };



import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL!);

export default db;
