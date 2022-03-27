const pg = require('pg');

const Pool = pg.Pool;

const url = require('url');

let config = {};

const pool = new Pool ({
  database: 'weekend-to-do-app', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
});



pool.on("connect", () => {
  console.log("connected to postgres");
});

pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

module.exports = pool;