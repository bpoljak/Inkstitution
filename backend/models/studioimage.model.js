const sql = require("../config/db.config");

const StudioImage = function(studioImage) {
    this.studioImageID = studioImage.studioImageID;
    this.studioImageDescription = studioImage.studioImageDescription;
    this.studioImageLink = studioImage.studioImageLink;
    this.studioProfileImageLink = studioImage.studioProfileImageLink;
    this.createdAt = studioImage.createdAt;
    this.updatedAt = studioImage.updatedAt;
};

// Kreiranje nove slike za studio
StudioImage.createStudioImage = (newStudioImage, result) => {
    const createStudioImageQuery = `
        INSERT INTO StudioImages (StudioImageDescription, StudioImageLink, StudioProfileImageLink, CreatedAt, UpdatedAt) 
        VALUES (?, ?, ?, ?, ?)`;

    const currentTimestamp = new Date(); // Trenutni datum i vrijeme

    sql.query(
        createStudioImageQuery,
        [
            newStudioImage.studioImageDescription,
            newStudioImage.studioImageLink,
            newStudioImage.studioProfileImageLink,
            currentTimestamp,
            currentTimestamp
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created studio image: ", { id: res.insertId, ...newStudioImage });
            result(null, { id: res.insertId, ...newStudioImage });
        }
    );
};

// Ažuriranje slike za studio po ID-u
StudioImage.updateStudioImageById = (id, studioImage, result) => {
    const updateStudioImageQuery = `
        UPDATE StudioImages 
        SET StudioImageDescription = ?, StudioImageLink = ?, StudioProfileImageLink = ?, UpdatedAt = ?
        WHERE StudioImageID = ?`;

    const currentTimestamp = new Date(); // Trenutni datum i vrijeme

    sql.query(
        updateStudioImageQuery,
        [
            studioImage.studioImageDescription,
            studioImage.studioImageLink,
            studioImage.studioProfileImageLink,
            currentTimestamp,
            id
        ],
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

            console.log("updated studio image: ", { id: id, ...studioImage });
            result(null, { id: id, ...studioImage });
        }
    );
};

// Ažuriranje datuma i vremena samo za UpdatedAt
StudioImage.updateStudioImageTimestamp = (id, result) => {
    const updateTimestampQuery = `
        UPDATE StudioImages 
        SET UpdatedAt = ?
        WHERE StudioImageID = ?`;

    const currentTimestamp = new Date(); // Trenutni datum i vrijeme

    sql.query(updateTimestampQuery, [currentTimestamp, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated timestamp for studio image with id: ", id);
        result(null, res);
    });
};

StudioImage.getAllStudioImages = (result) => {
    const getAllStudioImagesQuery = `SELECT * FROM StudioImages`;
    sql.query(getAllStudioImagesQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found all studio images: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  StudioImage.getStudioImageById = (id, result) => {
    const getStudioImageByIdQuery = `SELECT * FROM StudioImages WHERE StudioImageID = ${id}`
    sql.query(getStudioImageByIdQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found studio images: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  StudioImage.deleteStudioImageById = (id, result) => {
    const deleteStudioImageByIdQuery = `DELETE FROM StudioImages WHERE StudioImageID = ${id}`;
    sql.query(deleteStudioImageByIdQuery, id, (err, res) => {
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
  
      console.log("deleted Studio image with id: ", id);
      result(null, res);
    });
  };


  StudioImage.getStudioImageCreatedAt = (id, result) => {
    const getStudioImageCreatedAt = `SELECT CreatedAt FROM StudioImages WHERE StudioImageID = ?`;
    sql.query(getStudioImageCreatedAt, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Studio Image created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

StudioImage.getStudioImageUpdatedAt = (id, result) => {
    const getStudioImageUpdatedAt = `SELECT UpdatedAt FROM StudioImages WHERE StudioImageID = ?`;
    sql.query(getStudioImageUpdatedAt, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Studio updated created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = StudioImage;
