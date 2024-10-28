const sql = require("../config/db.config");

const Artist = function(artist) {
    this.artistId = artist.artistId;
    this.artistName = artist.artistName;
    this.artistProfileImageLink = artist.artistProfileImageLink;
  };

Artist.createArtist = (newArtist, result) => {
  const createArtistQuery = `
    INSERT INTO Artists (ArtistName, ArtistProfileImageLink) 
    VALUES (?, ?)`;
  
  sql.query(
    createArtistQuery, 
    [newArtist.artistName, newArtist.artistProfileImageLink], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created artist: ", { id: res.insertId, ...newArtist });
      result(null, { id: res.insertId, ...newArtist });
    }
  );
};

Artist.createArtistProfileImage = (newArtistProfileImage, result) => {
  const createArtistProfileImageQuery = `
    INSERT INTO Artists (ArtistProfileImageLink) 
    VALUES (?)`;
  
  sql.query(
    createArtistProfileImageQuery, 
    [newArtistProfileImage.artistProfileImageLink], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created artist profile image: ", { id: res.insertId, ...newArtistProfileImage });
      result(null, { id: res.insertId, ...newArtistProfileImage });
    }
  );
};

Artist.getAllArtists = (result) => {
  const getAllArtistsQuery = "SELECT * FROM Artists";

  sql.query(getAllArtistsQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Artists: ", res);
    result(null, res);
  });
};

Artist.getArtistById = (id, result) => {
  const getArtistByIdQuery = `SELECT * FROM Artists WHERE ArtistID = ${id}`
  sql.query(getArtistByIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found artist with the id
    result({ kind: "not_found" }, null);
  });
};

Artist.getArtistProfileImageByArtistId = (id, result) => {
  const getArtistProfileImageByArtistIdQuery = `SELECT ArtistProfileImage FROM Artists WHERE ArtistID = ${id}`
  sql.query(getArtistProfileImageByArtistIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artist profile image: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found artist profile image with the artist id
    result({ kind: "not_found" }, null);
  });
};

Artist.updateArtistById = (id, artist, result) => {
  const updateArtistQuery = `
    UPDATE Artists 
    SET ArtistName = ?, ArtistProfileImageLink = ?
    WHERE ArtistID = ?`;
    sql.query(
      updateArtistQuery, 
      [artist.artistName, artist.artistProfileImageLink, id],
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
  
        console.log("updated artist: ", { id: id, ...artist });
        result(null, { id: id, ...artist });
      }
    );
  };

Artist.updateArtistProfileImageByArtistId = (id, artist, result) => {
  const updateArtistProfileImageQuery = `
    UPDATE Artists 
    SET ArtistProfileImageLink = ?
    WHERE ArtistID = ?`;
    sql.query(
      updateArtistProfileImageQuery, 
      [artist.artistProfileImageLink, id],
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
    
        console.log("updated artist image: ", { id: id, ...artist });
        result(null, { id: id, ...artist });
      }
    );
  };

Artist.deleteArtistById = (id, result) => {
  const deleteArtistByIdQuery = `DELETE FROM Artists WHERE ArtistID = ${id}`;
  sql.query(deleteArtistByIdQuery, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  
    if (res.affectedRows == 0) {
      // not found artist with the id
      result({ kind: "not_found" }, null);
      return;
    }
  
    console.log("deleted artist with id: ", id);
    result(null, res);
  });
};

Artist.deleteArtistProfileImageByArtistId = (id, result) => {
  const deleteArtistByIdQuery = `DELETE ArtistProfileImage FROM Artists WHERE ArtistID = ${id}`;
  sql.query(deleteArtistByIdQuery, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  
    if (res.affectedRows == 0) {
      // not found artist with the id
      result({ kind: "not_found" }, null);
      return;
    }
  
    console.log("deleted artist with id: ", id);
    result(null, res);
  });
};