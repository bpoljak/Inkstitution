const sql = require("./db.js");

const Studio = function(studio) {
    this.studioId = studio.studioId
    this.studioName = studio.studioName;
    this.studioAddres = studio.studioAddres;
    this.studioWorkingHours = studio.studioWorkingHours;
    this.studioEmail = studio.studioEmail;
    this.studioAccountName =studio.studioAccountName;
    this.studioPassword = studio.studioPassword
};

Studio.createStudio = (newStudio, result) => {
    const createStudioQuery = "INSERT INTO Studios (StudioName, StudioAddress, StudioWorkingHours, StudioEmail, StudioAccountName, StudioPassword) VALUES (?, ?, ?, ?, ? ,?)";
    sql.query(createStudioQuery, newStudio, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created studio: ", { id: res.insertId, ...newStudio});
        result(null, { id: res.insertId, ...newStudio});
    });
};

Studio.getAllStudios = (result) => {
    const getAllStudiosQuery = "SELECT * FROM Studios";
    sql.query(getAllStudiosQuery, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Studios: ", res);
        result(null, res);
    });
};

Studio.getStudioById = (id, result) => {
    const getStudioByIdQuery = `SELECT * FROM Studios WHERE StudioID = ${id}`;
    sql.query(getStudioByIdQuery, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.lenght) {
            console.log("Found studio: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};