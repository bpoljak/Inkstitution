const UserImage = require("../models/userimage.model.js");

exports.createUserImage = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const userImage = {
    userImageDescription: req.body.userImageDescription,
    userImageLink: req.body.userImageLink,
    profileImageLink: req.body.userProfileImageLink,
  };

  UserImage.createUserImage(userImage, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user image.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getAllUserImages = (req, res) => {
  UserImage.getAllUserImages((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user images.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getUserImagesByUserId = (req, res) => {
  UserImage.getUserImagesByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No images found for user with ID ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving images for user with ID ${req.params.userId}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateUserImageById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const updatedUserImage = {
    userImageDescription: req.body.userImageDescription,
    userImageLink: req.body.userImageLink,
    profileImageLink: req.body.userProfileImageLink,
  };

  UserImage.updateUserImageById(
    req.params.id,
    updatedUserImage,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating user image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

exports.deleteUserImageById = (req, res) => {
  UserImage.deleteUserImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete user image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ message: "User image was deleted successfully!" });
    }
  });
};

exports.getUserImageCreatedAt = (req, res) => {
  UserImage.getUserImageCreatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving createdAt for user image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ createdAt: data.CreatedAt });
    }
  });
};

exports.getUserImageUpdatedAt = (req, res) => {
  UserImage.getUserImageUpdatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving UpdatedAt for user image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send({ updatedAt: data.UpdatedAt });
    }
  });
};
