const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./config/db.config");
const cors = require("cors");

const app = express();
const PORT = 3000;

const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions",
  createtable: true,
});

const corsOptions = {
  origin: "http://localhost:9000",
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
require("./routes/appointment.routes.js")(app);
require("./routes/email.routes.js")(app);
require("./routes/studioregister.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
