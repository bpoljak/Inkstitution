const UserProfileImage = require("../models/userprofileimage.model.js");

exports.createuserProfileImage = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const userProfileImage = {
    UserProfileImageDescription: req.body.UserProfileImageDescription,
    UserProfileImageLink: req.body.UserProfileImageLink,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  };

  UserProfileImage.createuserProfileImage(userProfileImage, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the user profile image.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getAlluserProfileImages = (req, res) => {
  UserProfileImage.getAlluserProfileImages((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving user profile images.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getuserProfileImageById = (req, res) => {
  UserProfileImage.getuserProfileImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user profile image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving user profile image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.getuserProfileImagesByuserId = (req, res) => {
  console.log("Request received for user ID:", req.params.userId);

  UserProfileImage.getuserProfileImagesByuserId(
    req.params.userId,
    (err, data) => {
      if (err) {
        console.error("Error in fetching images:", err);
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `No profile image found for user ID ${req.params.userId}.`,
          });
        } else {
          return res
            .status(500)
            .send({ message: "Error fetching user profile images." });
        }
      }
      console.log("Fetched data:", data);
      res.send(data);
    }
  );
};

exports.updateuserProfileImageById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const updatedUserProfileImage = {
    UserProfileImageDescription: req.body.UserProfileImageDescription,
    UserProfileImageLink: req.body.UserProfileImageLink,
    UpdatedAt: new Date(),
  };

  UserProfileImage.updateuserProfileImageById(
    req.params.id,
    updatedUserProfileImage,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating user profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

exports.deleteuserProfileImageById = (req, res) => {
  UserProfileImage.deleteuserProfileImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user profile image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete user profile image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ message: `User profile image was deleted successfully!` });
    }
  });
};

exports.getuserProfileImageCreatedAt = (req, res) => {
  UserProfileImage.getuserProfileImageCreatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving createdAt for user profile image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ CreatedAt: data.CreatedAt });
    }
  });
};

exports.getuserProfileImageUpdatedAt = (req, res) => {
  UserProfileImage.getuserProfileImageUpdatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user profile image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving updatedAt for user profile image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ UpdatedAt: data.UpdatedAt });
    }
  });
};

exports.updateuserProfileImageTimestamp = (req, res) => {
  UserProfileImage.updateuserProfileImageTimestamp(
    req.params.id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating timestamp for user profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send({
          message: `User profile image timestamp was updated successfully!`,
        });
      }
    }
  );
};
