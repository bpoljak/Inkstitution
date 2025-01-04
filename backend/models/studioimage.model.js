const knex = require("../config/db.config");

const StudioImage = function (studioImage) {
  this.studioImageID = studioImage.studioImageID;
  this.studioImageDescription = studioImage.studioImageDescription;
  this.studioImageLink = studioImage.studioImageLink;
  this.studioProfileImageLink = studioImage.studioProfileImageLink;
  this.createdAt = studioImage.createdAt;
  this.updatedAt = studioImage.updatedAt;
};

StudioImage.createStudioImage = async (newStudioImage, result) => {
  try {
    const [id] = await knex("StudioImages").insert({
      StudioImageDescription: newStudioImage.studioImageDescription,
      StudioImageLink: newStudioImage.studioImageLink,
      StudioProfileImageLink: newStudioImage.studioProfileImageLink,
      CreatedAt: knex.fn.now(),
      UpdatedAt: knex.fn.now(),
    });

    console.log("Created studio image: ", { id, ...newStudioImage });
    result(null, { id, ...newStudioImage });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.updateStudioImageById = async (id, studioImage, result) => {
  try {
    const updated = await knex("StudioImages")
      .where({ StudioImageID: id })
      .update({
        StudioImageDescription: studioImage.studioImageDescription,
        StudioImageLink: studioImage.studioImageLink,
        StudioProfileImageLink: studioImage.studioProfileImageLink,
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated studio image: ", { id, ...studioImage });
      result(null, { id, ...studioImage });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.updateStudioImageTimestamp = async (id, result) => {
  try {
    const updated = await knex("StudioImages")
      .where({ StudioImageID: id })
      .update({
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated timestamp for studio image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.getAllStudioImages = async (result) => {
  try {
    const images = await knex("StudioImages").select("*");
    console.log("All studio images: ", images);
    result(null, images);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.getStudioImageById = async (id, result) => {
  try {
    const image = await knex("StudioImages").where({ StudioImageID: id });
    if (image) {
      console.log("Found studio image: ", image);
      result(null, image);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.getStudioImagesByStudioId = async (studioId, result) => {
  try {
    const images = await knex("StudioImages").where({ StudioID: studioId });
    result(null, images);
  } catch (err) {
    console.error("Error fetching studio images:", err);
    result(err, null);
  }
};

StudioImage.deleteStudioImageById = async (id, result) => {
  try {
    const deleted = await knex("StudioImages")
      .where({ StudioImageID: id })
      .del();
    if (deleted) {
      console.log("Deleted studio image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.getStudioImageCreatedAt = async (id, result) => {
  try {
    const createdAt = await knex("StudioImages")
      .where({ StudioImageID: id })
      .select("CreatedAt")
      .first();

    if (createdAt) {
      console.log("Studio image created at: ", createdAt);
      result(null, createdAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioImage.getStudioImageUpdatedAt = async (id, result) => {
  try {
    const updatedAt = await knex("StudioImages")
      .where({ StudioImageID: id })
      .select("UpdatedAt")
      .first();

    if (updatedAt) {
      console.log("Studio image updated at: ", updatedAt);
      result(null, updatedAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = StudioImage;
