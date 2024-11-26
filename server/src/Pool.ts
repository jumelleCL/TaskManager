import { Pool } from "pg";
import 'dotenv/config';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PSW,
    port: Number(process.env.DB_PORT),
});

export default pool;