const knex = require("../config/db.config");

const StudioProfileImage = function (studioProfileImage) {
  this.studioProfileImageID = studioProfileImage.studioProfileImageID;
  this.studioProfileImageDescription =
    studioProfileImage.studioProfileImageDescription;
  this.studioProfileImageLink = studioProfileImage.studioProfileImageLink;
  this.createdAt = studioProfileImage.createdAt;
  this.updatedAt = studioProfileImage.updatedAt;
};

StudioProfileImage.createStudioProfileImage = async (
  newStudioProfileImage,
  result
) => {
  try {
    const [id] = await knex("StudioProfileImages").insert({
      StudioProfileImageDescription:
        newStudioProfileImage.studioProfileImageDescription,
      StudioProfileImageLink: newStudioProfileImage.studioProfileImageLink,
      CreatedAt: knex.fn.now(),
      UpdatedAt: knex.fn.now(),
    });

    console.log("Created studio profile image: ", {
      id,
      ...newStudioProfileImage,
    });
    result(null, { id, ...newStudioProfileImage });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.updateStudioProfileImageById = async (
  id,
  studioProfileImage,
  result
) => {
  try {
    const updated = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .update({
        StudioProfileImageDescription:
          studioProfileImage.studioProfileImageDescription,
        StudioProfileImageLink: studioProfileImage.studioProfileImageLink,
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated studio profile image: ", {
        id,
        ...studioProfileImage,
      });
      result(null, { id, ...studioProfileImage });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.updateStudioProfileImageTimestamp = async (id, result) => {
  try {
    const updated = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .update({
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated timestamp for studio profile image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.getAllStudioProfileImages = async (result) => {
  try {
    const images = await knex("StudioProfileImages").select("*");
    console.log("All studio profile images: ", images);
    result(null, images);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.getStudioProfileImageById = async (id, result) => {
  try {
    const image = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .first();
    if (image) {
      console.log("Found studio profile image: ", image);
      result(null, image);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.getStudioProfileImagesByStudioId = async (
  studioId,
  result
) => {
  try {
    const images = await knex("StudioProfileImages").where({
      StudioID: studioId,
    });
    result(null, images);
  } catch (err) {
    console.error("Error fetching studio profile images:", err);
    result(err, null);
  }
};

StudioProfileImage.deleteStudioProfileImageById = async (id, result) => {
  try {
    const deleted = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .del();
    if (deleted) {
      console.log("Deleted studio profile image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.getStudioProfileImageCreatedAt = async (id, result) => {
  try {
    const createdAt = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .select("CreatedAt")
      .first();

    if (createdAt) {
      console.log("Studio profile image created at: ", createdAt);
      result(null, createdAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

StudioProfileImage.getStudioProfileImageUpdatedAt = async (id, result) => {
  try {
    const updatedAt = await knex("StudioProfileImages")
      .where({ StudioProfileImageID: id })
      .select("UpdatedAt")
      .first();

    if (updatedAt) {
      console.log("Studio profile image updated at: ", updatedAt);
      result(null, updatedAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = StudioProfileImage;
