const sql = require("./db.js");


const User = function(user) {
  this.userId = user.userId;
  this.userFirstName = user.userFirstName;
  this.userLastName = user.userLastName;
  this.userEmail = user.userEmail
  this.userAccountName = user.userAccountName
  this.userPassword = user.userPassword
};

