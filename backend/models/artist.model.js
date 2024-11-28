const knex = require("../config/db.config");

const Artist = function (artist) {
  this.artistId = artist.artistId;
  this.artistName = artist.artistName;
  this.artistProfileImageLink = artist.artistProfileImageLink;
};

Artist.createArtist = async (newArtist, result) => {
  try {
    const [id] = await knex("Artists").insert({
      ArtistName: newArtist.artistName,
      ArtistProfileImageLink: newArtist.artistProfileImageLink,
    });
    console.log("Created artist: ", { id, ...newArtist });
    result(null, { id, ...newArtist });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.createArtistProfileImage = async (newArtistProfileImage, result) => {
  try {
    const [id] = await knex("Artists").insert({
      ArtistProfileImageLink: newArtistProfileImage.artistProfileImageLink,
    });
    console.log("Created artist profile image: ", {
      id,
      ...newArtistProfileImage,
    });
    result(null, { id, ...newArtistProfileImage });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.getAllArtists = async (result) => {
  try {
    const artists = await knex("Artists").select("*");
    console.log("Artists: ", artists);
    result(null, artists);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.getArtistById = async (id, result) => {
  try {
    const artist = await knex("Artists").where({ ArtistID: id }).first();
    if (artist) {
      console.log("Found artist: ", artist);
      result(null, artist);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.getArtistProfileImageByArtistId = async (id, result) => {
  try {
    const artist = await knex("Artists")
      .where({ ArtistID: id })
      .select("ArtistProfileImageLink")
      .first();
    if (artist) {
      console.log("Found artist profile image: ", artist);
      result(null, artist);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.updateArtistById = async (id, artist, result) => {
  try {
    const updatedRows = await knex("Artists").where({ ArtistID: id }).update({
      ArtistName: artist.artistName,
      ArtistProfileImageLink: artist.artistProfileImageLink,
    });

    if (updatedRows) {
      console.log("Updated artist: ", { id, ...artist });
      result(null, { id, ...artist });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.updateArtistProfileImageByArtistId = async (id, artist, result) => {
  try {
    const updatedRows = await knex("Artists").where({ ArtistID: id }).update({
      ArtistProfileImageLink: artist.artistProfileImageLink,
    });

    if (updatedRows) {
      console.log("Updated artist profile image: ", { id, ...artist });
      result(null, { id, ...artist });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.deleteArtistById = async (id, result) => {
  try {
    const deletedRows = await knex("Artists").where({ ArtistID: id }).del();
    if (deletedRows) {
      console.log("Deleted artist with id: ", id);
      result(null, deletedRows);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Artist.deleteArtistProfileImageByArtistId = async (id, result) => {
  try {
    const deletedRows = await knex("Artists")
      .where({ ArtistID: id })
      .update({ ArtistProfileImageLink: null });

    if (deletedRows) {
      console.log("Deleted artist profile image with id: ", id);
      result(null, deletedRows);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = Artist;
