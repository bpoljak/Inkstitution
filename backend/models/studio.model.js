const knex = require("../config/db.config");

const Studio = function (studio) {
  this.studioName = studio.studioName;
  this.studioAddress = studio.studioAddress;
  this.studioWorkingHours = studio.studioWorkingHours;
  this.studioEmail = studio.studioEmail;
  this.studioAccountName = studio.studioAccountName;
  this.studioPassword = studio.studioPassword;
  this.createdAt = studio.createdAt;
  this.updatedAt = studio.updatedAt;
};

Studio.createStudio = async (newStudio, result) => {
  try {
    const [id] = await knex("Studios").insert({
      StudioName: newStudio.studioName,
      StudioAddress: newStudio.studioAddress,
      StudioWorkingHours: newStudio.studioWorkingHours,
      StudioEmail: newStudio.studioEmail,
      StudioAccountName: newStudio.studioAccountName,
      StudioPassword: newStudio.studioPassword,
    });

    console.log("Created studio: ", { id, ...newStudio });
    result(null, { id, ...newStudio });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Studio.getAllStudios = async (result) => {
  try {
    const studios = await knex("Studios").select("*");
    console.log("Studios: ", studios);
    result(null, studios);
  } catch (err) {
    console.error("Error: ", err);
    result(null, err);
  }
};

Studio.getStudioById = async (id, result) => {
  try {
    const studio = await knex("Studios").where({ StudioID: id }).first();
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
      StudioAddress: studio.studioAddress,
      StudioWorkingHours: studio.studioWorkingHours,
      StudioEmail: studio.studioEmail,
      StudioAccountName: studio.studioAccountName,
      StudioPassword: studio.studioPassword,
      UpdatedAt: knex.fn.now(),
    });

    if (updated) {
      console.log("Updated studio: ", { id, ...studio });
      result(null, { id, ...studio });
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
