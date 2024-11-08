const sql = require("../config/db.config");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.userId = user.userId;
  this.userFirstName = user.userFirstName;
  this.userLastName = user.userLastName;
  this.userEmail = user.userEmail;
  this.userAccountName = user.userAccountName;
  this.userPassword = user.userPassword;
};

User.createUser = (newUser, result) => {
  bcrypt.hash(newUser.userPassword, 10, (err, hash) => {
    if (err) {
      console.log("Hashing error:", err);
      result(err, null);
      return;
    }

    const createUserQuery = `
      INSERT INTO Users (UserFirstName, UserLastName, UserEmail, UserAccountName, UserPassword) 
      VALUES (?, ?, ?, ?, ?)`;

    sql.query(
      createUserQuery,
      [
        newUser.userFirstName,
        newUser.userLastName,
        newUser.userEmail,
        newUser.userAccountName,
        hash,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  });
};

User.getAllUsers = (result) => {
  const getAllUsersQuery = "SELECT * FROM Users";

  sql.query(getAllUsersQuery, (err, res) => {
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
  const getUserByIdQuery = `SELECT * FROM Users WHERE UserID = ${id}`;
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

User.updateUserById = (id, user, result) => {
  const updateUserQuery = `
    UPDATE Users 
    SET UserFirstName = ?, UserLastName = ?, UserEmail = ?, UserAccountName = ?, UserPassword = ?
    WHERE UserID = ?`;
  sql.query(
    updateUserQuery,
    [
      user.userFirstName,
      user.userLastName,
      user.userEmail,
      user.userAccountName,
      user.userPassword,
      id,
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.deleteUserById = (id, result) => {
  const deleteUserByIdQuery = `DELETE FROM Users WHERE UserID = ${id}`;
  sql.query(deleteUserByIdQuery, id, (err, res) => {
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

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

User.loginUser = (email, password, result) => {
  const loginUserQuery = `SELECT * FROM Users WHERE UserEmail = ?`;

  sql.query(loginUserQuery, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const user = res[0];

      console.log("Entered password:", password);
      console.log("Stored password hash:", user.UserPassword);

      if (!user.UserPassword) {
        console.error("Error: User password hash is undefined.");
        result({ kind: "invalid_password" }, null);
        return;
      }

      bcrypt.compare(password, user.UserPassword, (err, isMatch) => {
        if (err) {
          console.log("compare error: ", err);
          result(err, null);
          return;
        }

        if (isMatch) {
          console.log("login successful: ", user);
          result(null, { id: user.UserID, ...user });
        } else {
          result({ kind: "invalid_password" }, null);
        }
      });
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

module.exports = User;
