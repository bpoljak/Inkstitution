const knex = require("../config/db.config");

const Studio = function (studio) {
  this.studioName = studio.studioName;
  this.studioCity = studio.studioCity;
  this.studioAddress = studio.studioAddress;
  this.studioPhone = studio.studioPhone;
  this.studioWorkingHours = studio.studioWorkingHours;
  this.studioEmail = studio.studioEmail;
  this.studioPassword = studio.studioPassword;
};

Studio.createStudio = async (newStudio, result) => {
  try {
    const [id] = await knex("Studios").insert({
      StudioName: newStudio.studioName,
      StudioCity: newStudio.studioCity,
      StudioAddress: newStudio.studioAddress,
      StudioPhone: newStudio.studioPhone,
      StudioWorkingHours: newStudio.studioWorkingHours,
      StudioEmail: newStudio.studioEmail,
      StudioPassword: newStudio.studioPassword,
    });

    console.log("Created studio: ", { StudioID: id, ...newStudio });
    result(null, { StudioID: id, ...newStudio });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.getAllStudios = async (result) => {
  try {
    const studios = await knex("Studios").select(
      "StudioID",
      "StudioName",
      "StudioCity",
      "StudioAddress",
      "StudioPhone",
      "StudioWorkingHours",
      "StudioEmail",
      "CreatedAt",
      "UpdatedAt"
    );
    console.log("Studios: ", studios);
    result(null, studios);
  } catch (err) {
    console.error("Error: ", err);
    result(null, err);
  }
};

Studio.getStudioById = async (id, result) => {
  try {
    const studio = await knex("Studios")
      .where({ StudioID: id })
      .select(
        "StudioID",
        "StudioName",
        "StudioCity",
        "StudioAddress",
        "StudioPhone",
        "StudioWorkingHours",
        "StudioEmail",
        "CreatedAt",
        "UpdatedAt"
      )
      .first();
    if (studio) {
      console.log("Found studio: ", studio);
      result(null, studio);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.getStudioCreatedAt = async (id, result) => {
  try {
    const createdAt = await knex("Studios")
      .where({ StudioID: id })
      .select("CreatedAt")
      .first();
    if (createdAt) {
      console.log("Studio created at: ", createdAt);
      result(null, createdAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.getStudioUpdatedAt = async (id, result) => {
  try {
    const updatedAt = await knex("Studios")
      .where({ StudioID: id })
      .select("UpdatedAt")
      .first();
    if (updatedAt) {
      console.log("Studio updated at: ", updatedAt);
      result(null, updatedAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.updateStudioById = async (id, studio, result) => {
  try {
    const updated = await knex("Studios").where({ StudioID: id }).update({
      StudioName: studio.studioName,
      StudioCity: studio.studioCity,
      StudioAddress: studio.studioAddress,
      StudioPhone: studio.studioPhone,
      StudioWorkingHours: studio.studioWorkingHours,
      StudioEmail: studio.studioEmail,
      StudioPassword: studio.studioPassword,
      UpdatedAt: knex.fn.now(),
    });

    if (updated) {
      console.log("Updated studio: ", { StudioID: id, ...studio });
      result(null, { StudioID: id, ...studio });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.deleteStudioById = async (id, result) => {
  try {
    const deleted = await knex("Studios").where({ StudioID: id }).del();
    if (deleted) {
      console.log("Deleted studio with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = Studio;
