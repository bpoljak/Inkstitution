const knex = require("../config/db.config");

const StudioImage = function (studioImage) {
  this.studioImageID = studioImage.studioImageID;
  this.studioImageDescription = studioImage.studioImageDescription;
  this.studioImageLink = studioImage.studioImageLink;
  this.studioProfileImageLink = studioImage.studioProfileImageLink;
  this.createdAt = studioImage.createdAt;
  this.updatedAt = studioImage.updatedAt;
};

// Create a new studio image
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

// Update a studio image by ID
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

// Update only the UpdatedAt timestamp
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

// Get all studio images
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

// Get a studio image by ID
StudioImage.getStudioImageById = async (id, result) => {
  try {
    const image = await knex("StudioImages")
      .where({ StudioImageID: id })
      .first();
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

// Delete a studio image by ID
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

// Get creation timestamp for a studio image
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

// Get update timestamp for a studio image
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
