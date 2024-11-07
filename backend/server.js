const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: "http://localhost:9000"
};

app.use(cors(corsOptions));

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

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
});

// ovo je testni komentar