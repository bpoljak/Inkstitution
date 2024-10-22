const sql = require("./db.js");

const UserImage = function(userImage) {
    this.userImageId = userImage.userImageId;
    this.userImageDescription = userImage.userImageDescription;
    this.userImageLink = userImage.userImageLink;
    this.profileImageLink = userImage.profileImageLink;
  };

//test komentar