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
