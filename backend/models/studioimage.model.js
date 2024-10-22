const sql = require("./db.js");

const StudioImage = function(studioImage) {
    this.studioImageId = studioImage.studioImageId;
    this.studioImageDescription = studioImage.studioImageDescription;
    this.studioImageLink = studioImage.studioImageLink
    this.studioProfileImageLink = studioImage.studioProfileImageLink
    this.studioId = studioImage.studioImageId
    this.artistId = studioImage.artistId
    
  };