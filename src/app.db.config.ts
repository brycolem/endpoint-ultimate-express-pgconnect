import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'postgres_bench',
    port: 5432,
    database: process.env.DATABASE || 'your_database',
    user: process.env.DB_USER || 'your_user',
    password: process.env.DB_PWD || 'your_password',
    max: 26
});

export default db;
