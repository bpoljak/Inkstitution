const UserProfile = require("../models/userprofile.model.js");

exports.createUserProfile = (req, res) => {
  if (
    !req.body.userProfileId ||
    !req.body.userFirstName ||
    !req.body.userLastName
  ) {
    return res.status(400).send({
      message: "User ID, first name, and last name are required.",
    });
  }

  const userProfile = {
    userProfileId: req.body.userProfileId,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userProfileImage: req.body.userProfileImage || null,
  };

  UserProfile.createUserProfile(userProfile, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error creating user profile." });
    } else {
      res.send(data);
    }
  });
};

exports.getAllUserProfiles = (req, res) => {
  UserProfile.getAllUserProfiles((err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error fetching user profiles." });
    } else {
      res.send(data);
    }
  });
};

exports.getUserProfileById = (req, res) => {
  UserProfile.getUserProfileById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `User profile not found with user ID ${req.params.id}`,
          });
      } else {
        res
          .status(500)
          .send({
            message: `Error fetching user profile with user ID ${req.params.id}`,
          });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateUserProfileById = (req, res) => {
  if (!req.body.userFirstName || !req.body.userLastName) {
    return res
      .status(400)
      .send({ message: "First name and last name are required." });
  }

  const updatedProfile = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userProfileImage: req.body.userProfileImage || null,
  };

  UserProfile.updateUserProfileById(req.params.id, updatedProfile, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `User profile not found with user ID ${req.params.id}`,
          });
      } else {
        res.status(500).send({ message: "Error updating user profile." });
      }
    } else {
      res.send({ message: "User profile updated successfully." });
    }
  });
};

exports.deleteUserProfileById = (req, res) => {
  UserProfile.deleteUserProfileById(req.params.id, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `User profile not found with user ID ${req.params.id}`,
          });
      } else {
        res
          .status(500)
          .send({
            message: `Error deleting user profile with user ID ${req.params.id}`,
          });
      }
    } else {
      res.send({ message: "User profile deleted successfully!" });
    }
  });
};
