const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(">>>>> TEST .env:");
console.log("host:", process.env.host);
console.log("user:", process.env.user);
console.log("database:", process.env.database);

const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./config/db.config.js");
console.log("🔍 KORISTI SE KNEX KONFIG:");
console.log(knex.client.config.connection);

const cors = require("cors");

const app = express();
const PORT = 3000;

const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions",
  createtable: true,
});

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Inkstitution!." });
});

require("./routes/user.routes.js")(app);
require("./routes/aftercareproduct.routes.js")(app);
require("./routes/studio.routes.js")(app);
require("./routes/artist.routes.js")(app);
require("./routes/userimage.routes.js")(app);
require("./routes/studioimage.routes.js")(app);
require("./routes/studioprofileimage.routes.js")(app);
require("./routes/appointment.routes.js")(app);
require("./routes/email.routes.js")(app);
require("./routes/userprofileimage.routes.js")(app);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
