const knex = require("../config/db.config");

const UserProfileImage = function (userProfileImage) {
  this.UserProfileImageID = userProfileImage.UserProfileImageID;
  this.UserProfileImageDescription =
    userProfileImage.UserProfileImageDescription;
  this.UserProfileImageLink = userProfileImage.UserProfileImageLink;
  this.CreatedAt = userProfileImage.CreatedAt;
  this.UpdatedAt = userProfileImage.UpdatedAt;
};

UserProfileImage.createuserProfileImage = async (
  newUserProfileImage,
  result
) => {
  try {
    const [id] = await knex("UserProfileImages").insert({
      UserProfileImageDescription:
        newUserProfileImage.UserProfileImageDescription,
      UserProfileImageLink: newUserProfileImage.UserProfileImageLink,
      CreatedAt: knex.fn.now(),
      UpdatedAt: knex.fn.now(),
    });

    console.log("Created user profile image: ", {
      id,
      ...newUserProfileImage,
    });
    result(null, { id, ...newUserProfileImage });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.updateuserProfileImageById = async (
  id,
  userProfileImage,
  result
) => {
  try {
    const updated = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .update({
        UserProfileImageDescription:
          userProfileImage.UserProfileImageDescription,
        UserProfileImageLink: userProfileImage.UserProfileImageLink,
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated user profile image: ", {
        id,
        ...userProfileImage,
      });
      result(null, { id, ...userProfileImage });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.updateuserProfileImageTimestamp = async (id, result) => {
  try {
    const updated = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .update({
        UpdatedAt: knex.fn.now(),
      });

    if (updated) {
      console.log("Updated timestamp for user profile image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.getAlluserProfileImages = async (result) => {
  try {
    const images = await knex("UserProfileImages").select("*");
    console.log("All user profile images: ", images);
    result(null, images);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.getuserProfileImageById = async (id, result) => {
  try {
    const image = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .first();
    if (image) {
      console.log("Found user profile image: ", image);
      result(null, image);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.getuserProfileImagesByuserId = async (userId, result) => {
  console.log("Fetching images for user ID:", userId);

  try {
    const images = await knex("UserProfileImages").where({
      UserID: userId,
    });
    console.log("Fetched images:", images);

    if (images.length === 0) {
      return result({ kind: "not_found" }, null);
    }

    result(null, images);
  } catch (err) {
    console.error("Error fetching user profile images:", err);
    result(err, null);
  }
};

UserProfileImage.deleteuserProfileImageById = async (id, result) => {
  try {
    const deleted = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .del();
    if (deleted) {
      console.log("Deleted user profile image with id: ", id);
      result(null, { success: true });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.getuserProfileImageCreatedAt = async (id, result) => {
  try {
    const createdAt = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .select("CreatedAt")
      .first();

    if (createdAt) {
      console.log("User profile image created at: ", createdAt);
      result(null, createdAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

UserProfileImage.getuserProfileImageUpdatedAt = async (id, result) => {
  try {
    const updatedAt = await knex("UserProfileImages")
      .where({ UserProfileImageID: id })
      .select("UpdatedAt")
      .first();

    if (updatedAt) {
      console.log("User profile image updated at: ", updatedAt);
      result(null, updatedAt);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = UserProfileImage;
