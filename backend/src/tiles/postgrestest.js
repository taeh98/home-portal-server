const { Pool, Client } = require('pg');

console.log("in postgrestest.js");

const pool = new Pool({
    user: process.env.postgres_tiles_db_user_name,
    host: process.env.postgres_tiles_db_container_name,
    database: process.env.postgres_tiles_db_name,
    password: process.env.postgres_tiles_db_user_password,
    port: process.env.postgres_tiles_db_port,
});

async function main() {
    console.log("in main() in postgrestest.js");

    pool.query('SELECT * from links;', (err, res) => {
        console.log(err, res);
    });
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());