const sql = require("./db.js");

<<<<<<< HEAD
// constructor
const StudioImage = function(studioImage) {
  this.studioImageId = studioImage.studioImageId;
  this.studioImageDescription = studioImage.studioImageDescription;
  this.studioImageLink = studioImage.studioImageLink
  this.studioProfileImageLink = studioImage.studioProfileImageLink
  this.studioId = studioImage.studioImageId
  this.artistId = studioImage.artistId
  
};
=======
const Studio = function(studio) {
    this.studioId = studio.studioId
    this.studioName = studio.studioName;
    this.studioAddres = studio.studioAddres;
    this.studioWorkingHours = studio.studioWorkingHours;
    this.studioEmail = studio.studioEmail;
    this.studioAccountName =studio.studioAccountName;
    this.studioPassword = studio.studioPassword
}
>>>>>>> 0895b652f8cc142ea7a534fbe936f0ba24bcb96f
