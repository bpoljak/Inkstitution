const knex = require("../config/db.config");

const UserImage = function (userImage) {
  this.userImageId = userImage.userImageId;
  this.userImageDescription = userImage.userImageDescription;
  this.userImageLink = userImage.userImageLink;
  this.profileImageLink = userImage.profileImageLink;
};

// Create User Image
UserImage.createUserImage = async (newUserImage, result) => {
  try {
    const [id] = await knex("UserImages").insert({
      UserImageDescription: newUserImage.userImageDescription,
      UserImageLink: newUserImage.userImageLink,
      UserProfileImageLink: newUserImage.profileImageLink,
      CreatedAt: knex.fn.now(),
      UpdatedAt: knex.fn.now(),
    });

    console.log("Created user image: ", { id, ...newUserImage });
    result(null, { id, ...newUserImage });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

// Get all user images
UserImage.getAllUserImages = async (result) => {
  try {
    const images = await knex("UserImages").select("*");
    console.log("User Images: ", images);
    result(null, images);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

// Update User Image
UserImage.updateUserImageById = async (id, userImage, result) => {
  try {
    const updated = await knex("UserImages").where({ UserImageID: id }).update({
      UserImageDescription: userImage.userImageDescription,
      UserImageLink: userImage.userImageLink,
      UserProfileImageLink: userImage.profileImageLink,
      UpdatedAt: knex.fn.now(),
    });

    if (updated) {
      console.log("Updated user image: ", { id, ...userImage });
      result(null, { id, ...userImage });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

// Delete User Image
UserImage.deleteUserImageById = async (id, result) => {
  try {
    const deleted = await knex("UserImages").where({ UserImageID: id }).del();

    if (deleted) {
      console.log("Deleted user image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

// Get User Image Created At
UserImage.getUserImageCreatedAt = async (id, result) => {
  try {
    const createdAt = await knex("UserImages")
      .where({ UserImageID: id })
      .select("CreatedAt")
      .first();

    if (createdAt) {
      console.log("User Image created at: ", createdAt);
      result(null, createdAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserImage.getUserImagesByUserId = async (userId, result) => {
  try {
    const images = await knex("UserImages").where({ UserID: userId });
    if (images.length === 0) {
      return result({ kind: "not_found" }, null);
    }
    result(null, images);
  } catch (err) {
    console.error("Error fetching user images:", err);
    result(err, null);
  }
};

// Get User Image Updated At
UserImage.getUserImageUpdatedAt = async (id, result) => {
  try {
    const updatedAt = await knex("UserImages")
      .where({ UserImageID: id })
      .select("UpdatedAt")
      .first();

    if (updatedAt) {
      console.log("User Image updated at: ", updatedAt);
      result(null, updatedAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = UserImage;
