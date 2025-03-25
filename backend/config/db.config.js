const knex = require("knex");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

try {
  const db = knex({
    client: "mysql",
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: process.env.port,
    },
  });

  console.log("Successfully connected to the database using Knex.");

  module.exports = db;
} catch (error) {
  console.error("Error in Knex database config setup:", error);
}
