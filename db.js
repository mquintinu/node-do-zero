import 'dotenv/config'
import postgres from 'postgres'

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

PGPASSWORD = decodeURIComponent(PGPASSWORD);

export const sql = postgres(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}?sslmode=require`);
