const sql = require("./db.js");

const Studio = function(studio) {
    this.studioId = studio.studioId
    this.studioName = studio.studioName;
    this.studioAddres = studio.studioAddres;
    this.studioWorkingHours = studio.studioWorkingHours;
    this.studioEmail = studio.studioEmail;
    this.studioAccountName =studio.studioAccountName;
    this.studioPassword = studio.studioPassword;
    this.studioCreatedAt = studio.studioCreatedAt;
    this.studioUpdatedAt = studio.studioUpdatedAt;
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

Studio.getStudioCreatedAt = (id, result) => {
    const getStudioCreatedAtQuery = `SELECT CreatedAt FROM Studios WHERE StudioID = ${id}`;
    sql.query(getStudioCreatedAtQuery, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.lenght) {
            console.log("Studio created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Studio.getStudioUpdatedAt = (id, result) => {
    const getStudioUpdatedAtQuery = `SELECT UpdatedAt FROM Studios WHERE StudioID = ${id}`;
    sql.query(getStudioUpdatedAtQuery, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.lenght) {
            console.log("Studio created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Studio.updateStudioById = (id, studio, result) => {
    const updateUserQuery = `
      UPDATE Studios 
      SET StudioName = ?, StudioAddress = ?, StudioWorkingHours = ?, StudioEmail = ?, StudioAccountName = ?, StudioPassword = ?, UpdatedAt
      WHERE UserID = ?`;
      sql.query(
        updateUserQuery, 
        [studio.studioName, studio.studioAddres, studio.studioWorkingHours, studio.studioEmail, studio.studioAccountName, studio.studioPassword, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated studio: ", { id: id, ...user });
          result(null, { id: id, ...user });
        }
      );
    };

    Studio.deleteStudioById = (id, result) => {
        const deleteStudioByIdQuery = `DELETE FROM Studios WHERE StudioID = ${id}`;
        sql.query(deleteStudioByIdQuery, id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted Studio with id: ", id);
          result(null, res);
        });
      };