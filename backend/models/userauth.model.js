const knex = require("../config/db.config");
const bcrypt = require("bcrypt");

const UserAuth = function (userAuth) {
  this.userId = userAuth.userId;
  this.userEmail = userAuth.userEmail;
  this.userPassword = userAuth.userPassword;
};

UserAuth.createUserAuth = async (newUserAuth, result) => {
  try {
    const hashedPassword = await bcrypt.hash(newUserAuth.userPassword, 10);
    const [userId] = await knex("UserAuth").insert({
      UserEmail: newUserAuth.userEmail,
      UserPassword: hashedPassword,
    });
    console.log("created userAuth: ", { id: userId, ...newUserAuth });
    result(null, { id: userId, ...newUserAuth });
  } catch (err) {
    console.error("Error creating userAuth:", err);
    result(err, null);
  }
};

UserAuth.getAllUserAuths = async (result) => {
  try {
    const users = await knex("UserAuth").select("*");
    console.log("UserAuths: ", users);
    result(null, users);
  } catch (err) {
    console.error("Error fetching userAuths:", err);
    result(null, err);
  }
};

UserAuth.getUserAuthById = async (id, result) => {
  try {
    const user = await knex("UserAuth").where("UserID", id).first();
    if (user) {
      console.log("found userAuth: ", user);
      result(null, user);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error fetching userAuth by ID:", err);
    result(err, null);
  }
};

UserAuth.updateUserAuthById = async (id, userAuth, result) => {
  try {
    const hashedPassword = await bcrypt.hash(userAuth.userPassword, 10);
    const updatedRows = await knex("UserAuth").where("UserID", id).update({
      UserEmail: userAuth.userEmail,
      UserPassword: hashedPassword,
    });
    if (updatedRows > 0) {
      console.log("updated userAuth: ", { id: id, ...userAuth });
      result(null, { id: id, ...userAuth });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error updating userAuth:", err);
    result(null, err);
  }
};

UserAuth.deleteUserAuthById = async (id, result) => {
  try {
    const deletedRows = await knex("UserAuth").where("UserID", id).del();
    if (deletedRows > 0) {
      console.log("deleted userAuth with id: ", id);
      result(null, { message: "UserAuth deleted successfully" });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error deleting userAuth:", err);
    result(null, err);
  }
};

UserAuth.loginUserAuth = (email, password, result) => {
  knex("UserAuth")
    .where({ UserEmail: email })
    .first()
    .then((user) => {
      if (!user) {
        return result({ kind: "not_found" }, null);
      }
      bcrypt.compare(password, user.UserPassword, (err, isMatch) => {
        if (err) {
          return result(err, null);
        }

        if (isMatch) {
          result(null, {
            id: user.UserID,
            userEmail: user.UserEmail,
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

module.exports = UserAuth;
