const sql = require("../config/db.config");

// Constructor for the Studio model
const Studio = function(studio) {
    this.studioName = studio.studioName;
    this.studioAddress = studio.studioAddress;  // Corrected to Address
    this.studioWorkingHours = studio.studioWorkingHours;
    this.studioEmail = studio.studioEmail;
    this.studioAccountName = studio.studioAccountName;
    this.studioPassword = studio.studioPassword;
    this.createdAt = studio.createdAt;
    this.updatedAt = studio.updatedAt;
};

// Create a new Studio
Studio.createStudio = (newStudio, result) => {
    const createStudioQuery = `INSERT INTO Studios 
      (StudioName, StudioAddress, StudioWorkingHours, StudioEmail, StudioAccountName, StudioPassword) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    sql.query(createStudioQuery, [
        newStudio.studioName,
        newStudio.studioAddress,
        newStudio.studioWorkingHours,
        newStudio.studioEmail,
        newStudio.studioAccountName,
        newStudio.studioPassword
    ], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created studio: ", { id: res.insertId, ...newStudio});
        result(null, { id: res.insertId, ...newStudio});
    });
};

// Get all studios
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

// Get a studio by ID
Studio.getStudioById = (id, result) => {
    const getStudioByIdQuery = `SELECT * FROM Studios WHERE StudioID = ?`;
    sql.query(getStudioByIdQuery, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found studio: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

// Get studio creation timestamp by ID
Studio.getStudioCreatedAt = (id, result) => {
    const getStudioCreatedAtQuery = `SELECT CreatedAt FROM Studios WHERE StudioID = ?`;
    sql.query(getStudioCreatedAtQuery, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Studio created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Get studio update timestamp by ID
Studio.getStudioUpdatedAt = (id, result) => {
    const getStudioUpdatedAtQuery = `SELECT UpdatedAt FROM Studios WHERE StudioID = ?`;
    sql.query(getStudioUpdatedAtQuery, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Studio updated at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Update a studio by ID
Studio.updateStudioById = (id, studio, result) => {
    const updateStudioQuery = `
      UPDATE Studios 
      SET StudioName = ?, StudioAddress = ?, StudioWorkingHours = ?, StudioEmail = ?, StudioAccountName = ?, StudioPassword = ?, UpdatedAt = NOW()
      WHERE StudioID = ?`;

    sql.query(
        updateStudioQuery, 
        [
            studio.studioName, 
            studio.studioAddress, 
            studio.studioWorkingHours, 
            studio.studioEmail, 
            studio.studioAccountName, 
            studio.studioPassword, 
            id
        ], 
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated studio: ", { id: id, ...studio });
            result(null, { id: id, ...studio });
        }
    );
};

// Delete a studio by ID
Studio.deleteStudioById = (id, result) => {
    const deleteStudioByIdQuery = `DELETE FROM Studios WHERE StudioID = ?`;
    sql.query(deleteStudioByIdQuery, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted studio with id: ", id);
        result(null, res);
    });
};

module.exports = Studio;
