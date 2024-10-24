const sql = require("./db.js");


const User = function(User) {
  this.userId = user.userId;
  this.userFirstName = User.userFirstName;
  this.userLastName = User.userLastName;
  this.userEmail = User.userEmail
  this.userAccountName = User.userAccountName
  this.userPassword = User.userPassword
};

User.createUser = (newUser, result) => {
  const createUserQuery = "INSERT INTO Users (UserFirstName, UserLastName, UserEmail, UserAccountName, UserPassword) VALUES (?, ?, ?, ?, ?)";
  sql.query(createUserQuery, newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAllUsers = (title, result) => {
  const getAllUsersQuery = "SELECT * FROM Users";

  sql.getAllUsersQuery(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.getUserById = (id, result) => {
  const getUserByIdQuery = `SELECT * FROM Users WHERE StudioID = ${id}`
  sql.query(getUserByIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.updateById = (id, user, result) => {
  const updateUserQuery = `
    UPDATE Users 
    SET UserFirstName = ?, UserLastName = ?, UserEmail = ?, UserAccountName = ?, UserPassword = ?
    WHERE UserID = ?`;
    sql.query(
      updateUserQuery, 
      [user.userFirstName, user.userLastName, user.userEmail, user.userAccountName, user.userPassword, id],
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
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };