import dotenv from 'dotenv';
dotenv.config();
export const environment = {
  db: {
    host: process.env.PGHOST,
    port: process.env.PGPORT as unknown as number,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDBNAME,
  },
};

export default environment;
