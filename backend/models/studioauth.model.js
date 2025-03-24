const knex = require("../config/db.config");
const bcrypt = require("bcrypt");

const StudioAuth = function (studioAuth) {
  this.studioEmail = studioAuth.studioEmail;
  this.studioPassword = studioAuth.studioPassword;
};

StudioAuth.createStudioAuth = async (newStudioAuth, result) => {
  try {
    const hashedPassword = await bcrypt.hash(newStudioAuth.studioPassword, 10);
    const [studioId] = await knex("StudioAuth").insert({
      StudioEmail: newStudioAuth.studioEmail,
      StudioPassword: hashedPassword,
    });
    console.log("Created studioAuth: ", { id: studioId, ...newStudioAuth });
    result(null, { id: studioId, ...newStudioAuth });
  } catch (err) {
    console.error("Error creating studioAuth:", err);
    result(err, null);
  }
};

StudioAuth.getAllStudioAuths = async (result) => {
  try {
    const studios = await knex("StudioAuth").select("*");
    console.log("StudioAuths: ", studios);
    result(null, studios);
  } catch (err) {
    console.error("Error fetching studioAuths:", err);
    result(null, err);
  }
};

StudioAuth.getStudioAuthById = async (id, result) => {
  try {
    const studio = await knex("StudioAuth").where("StudioID", id).first();
    if (studio) {
      console.log("Found studioAuth: ", studio);
      result(null, studio);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error fetching studioAuth by ID:", err);
    result(err, null);
  }
};

StudioAuth.updateStudioAuthById = async (id, studioAuth, result) => {
  try {
    const hashedPassword = await bcrypt.hash(studioAuth.studioPassword, 10);
    const updatedRows = await knex("StudioAuth").where("StudioID", id).update({
      StudioEmail: studioAuth.studioEmail,
      StudioPassword: hashedPassword,
    });
    if (updatedRows > 0) {
      console.log("Updated studioAuth: ", { id: id, ...studioAuth });
      result(null, { id: id, ...studioAuth });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error updating studioAuth:", err);
    result(null, err);
  }
};

StudioAuth.deleteStudioAuthById = async (id, result) => {
  try {
    const deletedRows = await knex("StudioAuth").where("StudioID", id).del();
    if (deletedRows > 0) {
      console.log("Deleted studioAuth with ID: ", id);
      result(null, { message: "StudioAuth deleted successfully." });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error deleting studioAuth:", err);
    result(null, err);
  }
};

StudioAuth.loginStudioAuth = (email, password, result) => {
  knex("StudioAuth")
    .where({ StudioEmail: email })
    .first()
    .then((studio) => {
      if (!studio) {
        return result({ kind: "not_found" }, null);
      }
      bcrypt.compare(password, studio.StudioPassword, (err, isMatch) => {
        if (err) {
          return result(err, null);
        }

        if (isMatch) {
          result(null, {
            id: studio.StudioID,
            studioEmail: studio.StudioEmail,
          });
        } else {
          result({ kind: "invalid_password" }, null);
        }
      });
    })
    .catch((err) => {
      console.error("Login error:", err);
      result(err, null);
    });
};

module.exports = StudioAuth;
