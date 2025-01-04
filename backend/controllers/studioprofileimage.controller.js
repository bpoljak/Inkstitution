const StudioProfileImage = require("../models/studioprofileimage.model.js");

exports.createStudioProfileImage = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const studioProfileImage = {
    studioProfileImageDescription: req.body.studioProfileImageDescription,
    studioProfileImageLink: req.body.studioProfileImageLink,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  StudioProfileImage.createStudioProfileImage(
    studioProfileImage,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the studio profile image.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.getAllStudioProfileImages = (req, res) => {
  StudioProfileImage.getAllStudioProfileImages((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving studio profile images.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getStudioProfileImageById = (req, res) => {
  StudioProfileImage.getStudioProfileImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio profile image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving studio profile image with id ${req.params.id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.getStudioProfileImagesByStudioId = (req, res) => {
  const studioId = req.params.studioId;
  StudioProfileImage.getStudioProfileImagesByStudioId(studioId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error fetching studio profile images.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateStudioProfileImageById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const updatedStudioProfileImage = {
    studioProfileImageDescription: req.body.studioProfileImageDescription,
    studioProfileImageLink: req.body.studioProfileImageLink,
    updatedAt: new Date(),
  };

  StudioProfileImage.updateStudioProfileImageById(
    req.params.id,
    updatedStudioProfileImage,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found studio profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating studio profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

exports.deleteStudioProfileImageById = (req, res) => {
  StudioProfileImage.deleteStudioProfileImageById(
    req.params.id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found studio profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Could not delete studio profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send({ message: `Studio profile image was deleted successfully!` });
      }
    }
  );
};

exports.getStudioProfileImageCreatedAt = (req, res) => {
  StudioProfileImage.getStudioProfileImageCreatedAt(
    req.params.id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found studio image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error retrieving createdAt for studio profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send({ createdAt: data.CreatedAt });
      }
    }
  );
};

exports.getStudioProfileImageUpdatedAt = (req, res) => {
  StudioProfileImage.getStudioProfileImageUpdatedAt(
    req.params.id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found studio profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error retrieving updatedAt for studio profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send({ updatedAt: data.UpdatedAt });
      }
    }
  );
};

exports.updateStudioProfileImageTimestamp = (req, res) => {
  StudioProfileImage.updateStudioProfileImageTimestamp(
    req.params.id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found studio profile image with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating timestamp for studio profile image with id ${req.params.id}.`,
          });
        }
      } else {
        res.send({
          message: `Studio profile image timestamp was updated successfully!`,
        });
      }
    }
  );
};
