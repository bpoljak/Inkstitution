const knex = require("../config/db.config");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.userId = user.userId;
  this.userFirstName = user.userFirstName;
  this.userLastName = user.userLastName;
  this.userEmail = user.userEmail;
  this.userAccountName = user.userAccountName;
  this.userPassword = user.userPassword;
};

User.createUser = async (newUser, result) => {
  try {
    const hashedPassword = await bcrypt.hash(newUser.userPassword, 10);
    const [userId] = await knex("Users").insert({
      UserFirstName: newUser.userFirstName,
      UserLastName: newUser.userLastName,
      UserEmail: newUser.userEmail,
      UserAccountName: newUser.userAccountName,
      UserPassword: hashedPassword,
    });
    console.log("created user: ", { id: userId, ...newUser });
    result(null, { id: userId, ...newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    result(err, null);
  }
};

User.getAllUsers = async (result) => {
  try {
    const users = await knex("Users").select("*");
    console.log("Users: ", users);
    result(null, users);
  } catch (err) {
    console.error("Error fetching users:", err);
    result(null, err);
  }
};

User.getUserById = async (id, result) => {
  try {
    const user = await knex("Users").where("UserID", id).first();
    if (user) {
      console.log("found user: ", user);
      result(null, user);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    result(err, null);
  }
};

User.updateUserById = async (id, user, result) => {
  try {
    const updatedRows = await knex("Users").where("UserID", id).update({
      UserFirstName: user.userFirstName,
      UserLastName: user.userLastName,
      UserEmail: user.userEmail,
      UserAccountName: user.userAccountName,
      UserPassword: user.userPassword,
    });
    if (updatedRows > 0) {
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error updating user:", err);
    result(null, err);
  }
};

User.deleteUserById = async (id, result) => {
  try {
    const deletedRows = await knex("Users").where("UserID", id).del();
    if (deletedRows > 0) {
      console.log("deleted user with id: ", id);
      result(null, { message: "User deleted successfully" });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    result(null, err);
  }
};

User.loginUser = (email, password, result) => {
  knex("Users")
    .where({ UserEmail: email })
    .first()
    .then((user) => {
      if (!user) {
        return result({ kind: "not_found" }, null);
      }
      console.log(user);
      bcrypt.compare(password, user.UserPassword, (err, isMatch) => {
        if (err) {
          return result(err, null);
        }

        if (isMatch) {
          result(null, {
            id: user.UserID,
            userFirstName: user.UserFirstName,
            userLastName: user.UserLastName,
            userEmail: user.UserEmail,
            userAccountName: user.UserAccountName,
          });
        } else {
          result({ kind: "invalid_password" }, null);
        }
      });
    })
    .catch((err) => {
      console.error("Greška prilikom prijave:", err);
      result(err, null);
    });
};

module.exports = User;
