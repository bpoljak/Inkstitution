const knex = require("knex");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

try {
  const db = knex({
    client: "mysql",
    connection: {
      host: process.env.host, // Vaš host iz .env datoteke
      user: process.env.user, // Vaše korisničko ime iz .env datoteke
      password: process.env.password, // Vaša lozinka iz .env datoteke
      database: process.env.database, // Naziv baze podataka iz .env datoteke
      port: process.env.port, // Port iz .env datoteke
    },
  });

  console.log("Successfully connected to the database using Knex.");

  module.exports = db;
} catch (error) {
  console.error("Error in Knex database config setup:", error);
}
