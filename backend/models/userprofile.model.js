const knex = require("../config/db.config");

const UserProfile = function (userProfile) {
  this.userProfileId = userProfile.userProfileId;
  this.userFirstName = userProfile.userFirstName;
  this.userLastName = userProfile.userLastName;
  this.userProfileImage = userProfile.userProfileImage;
};

UserProfile.createUserProfile = async (newUserProfile, result) => {
  try {
    const [userProfileId] = await knex("UserProfiles").insert({
      UserID: newUserProfile.userProfileId,
      UserFirstName: newUserProfile.userFirstName,
      UserLastName: newUserProfile.userLastName,
      UserProfileImage: newUserProfile.userProfileImage,
    });
    console.log("Created user profile: ", {
      id: userProfileId,
      ...newUserProfile,
    });
    result(null, { id: userProfileId, ...newUserProfile });
  } catch (err) {
    console.error("Error creating user profile:", err);
    result(err, null);
  }
};

UserProfile.getAllUserProfiles = async (result) => {
  try {
    const profiles = await knex("UserProfiles").select("*");
    console.log("User profiles: ", profiles);
    result(null, profiles);
  } catch (err) {
    console.error("Error fetching user profiles:", err);
    result(null, err);
  }
};

UserProfile.getUserProfileById = async (id, result) => {
  try {
    const profile = await knex("UserProfiles").where("UserID", id).first();
    if (profile) {
      console.log("Found user profile: ", profile);
      result(null, profile);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error fetching user profile by ID:", err);
    result(err, null);
  }
};

UserProfile.updateUserProfileById = async (id, userProfile, result) => {
  try {
    const updatedRows = await knex("UserProfiles").where("UserID", id).update({
      UserFirstName: userProfile.userFirstName,
      UserLastName: userProfile.userLastName,
      UserProfileImage: userProfile.userProfileImage,
    });
    if (updatedRows > 0) {
      console.log("Updated user profile: ", { id: id, ...userProfile });
      result(null, { id: id, ...userProfile });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error updating user profile:", err);
    result(null, err);
  }
};

UserProfile.deleteUserProfileById = async (id, result) => {
  try {
    const deletedRows = await knex("UserProfiles").where("UserID", id).del();
    if (deletedRows > 0) {
      console.log("Deleted user profile with ID: ", id);
      result(null, { message: "User profile deleted successfully." });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error deleting user profile:", err);
    result(null, err);
  }
};

module.exports = UserProfile;
