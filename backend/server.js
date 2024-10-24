const express = require("express");
const cors = require("cors");
const mysqlConnection = require("./config/db.config"); 

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Inkstitution!." });
});




app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
});

