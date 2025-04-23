const knex = require("knex");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: Number(process.env.port),
  },
});

(async () => {
  try {
    await db.raw("SELECT 1");
    console.log("Spojeno na MySQL bazu!");
  } catch (err) {
    console.error("Greška prilikom spajanja:", err);
    process.exit(1);
  }
})();

module.exports = db;
