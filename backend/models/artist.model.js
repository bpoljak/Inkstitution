const sql = require("./db.js");

const Artist = function(artist) {
    this.artistId = artist.artistId;
    this.artistName = artist.artistName;

  };