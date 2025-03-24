const knex = require("../config/db.config");

const StudioProfile = function (studioProfile) {
  this.studioName = studioProfile.studioName;
  this.studioCity = studioProfile.studioCity;
  this.studioAddress = studioProfile.studioAddress;
  this.studioPhone = studioProfile.studioPhone;
  this.studioWorkingHours = studioProfile.studioWorkingHours;
  this.studioProfileImage = studioProfile.studioProfileImage;
};

StudioProfile.createStudioProfile = async (
  studioId,
  newStudioProfile,
  result
) => {
  try {
    const [insertedId] = await knex("StudioProfiles").insert({
      StudioID: studioId,
      StudioName: newStudioProfile.studioName,
      StudioCity: newStudioProfile.studioCity,
      StudioAddress: newStudioProfile.studioAddress,
      StudioPhone: newStudioProfile.studioPhone,
      StudioWorkingHours: newStudioProfile.studioWorkingHours,
      StudioProfileImage: newStudioProfile.studioProfileImage,
    });
    console.log("Created studio profile: ", {
      id: insertedId,
      ...newStudioProfile,
    });
    result(null, { id: insertedId, ...newStudioProfile });
  } catch (err) {
    console.error("Error creating studio profile:", err);
    result(err, null);
  }
};

StudioProfile.getAllStudioProfiles = async (result) => {
  try {
    const profiles = await knex("StudioProfiles").select("*");
    console.log("Studio profiles: ", profiles);
    result(null, profiles);
  } catch (err) {
    console.error("Error fetching studio profiles:", err);
    result(null, err);
  }
};

StudioProfile.getStudioProfileById = async (studioId, result) => {
  try {
    const profile = await knex("StudioProfiles")
      .where("StudioID", studioId)
      .first();
    if (profile) {
      console.log("Found studio profile: ", profile);
      result(null, profile);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error fetching studio profile:", err);
    result(err, null);
  }
};

StudioProfile.updateStudioProfileById = async (
  studioId,
  updatedProfile,
  result
) => {
  try {
    const updated = await knex("StudioProfiles")
      .where("StudioID", studioId)
      .update({
        StudioName: updatedProfile.studioName,
        StudioCity: updatedProfile.studioCity,
        StudioAddress: updatedProfile.studioAddress,
        StudioPhone: updatedProfile.studioPhone,
        StudioWorkingHours: updatedProfile.studioWorkingHours,
        StudioProfileImage: updatedProfile.studioProfileImage,
      });

    if (updated > 0) {
      console.log("Updated studio profile: ", { studioId, ...updatedProfile });
      result(null, { studioId, ...updatedProfile });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error updating studio profile:", err);
    result(err, null);
  }
};

StudioProfile.deleteStudioProfileById = async (studioId, result) => {
  try {
    const deleted = await knex("StudioProfiles")
      .where("StudioID", studioId)
      .del();
    if (deleted > 0) {
      console.log("Deleted studio profile with ID: ", studioId);
      result(null, { message: "Studio profile deleted successfully." });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error deleting studio profile:", err);
    result(null, err);
  }
};

module.exports = StudioProfile;
