const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:9000", // Frontend URL
  credentials: true, // Omogućava slanje kolačića
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Inkstitution!." });
});

require("./routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
