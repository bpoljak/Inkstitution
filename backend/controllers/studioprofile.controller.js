const StudioProfile = require("../models/studioprofile.model.js");

exports.createStudioProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const studioProfile = {
    studioName: req.body.studioName,
    studioCity: req.body.studioCity,
    studioAddress: req.body.studioAddress,
    studioPhone: req.body.studioPhone,
    studioWorkingHours: req.body.studioWorkingHours,
  };

  StudioProfile.createStudioProfile(
    req.body.studioId,
    studioProfile,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the StudioProfile.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.getAllStudioProfiles = (req, res) => {
  StudioProfile.getAllStudioProfiles((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving all studio profiles.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getStudioProfileById = (req, res) => {
  StudioProfile.getStudioProfileById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found StudioProfile with StudioID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving StudioProfile with StudioID " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateStudioProfileById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const updatedProfile = {
    studioName: req.body.studioName,
    studioCity: req.body.studioCity,
    studioAddress: req.body.studioAddress,
    studioPhone: req.body.studioPhone,
    studioWorkingHours: req.body.studioWorkingHours,
  };

  StudioProfile.updateStudioProfileById(
    req.params.id,
    updatedProfile,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found StudioProfile with StudioID ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating StudioProfile with StudioID " + req.params.id,
          });
        }
      } else {
        res.send({ message: "StudioProfile updated successfully." });
      }
    }
  );
};

exports.deleteStudioProfileById = (req, res) => {
  StudioProfile.deleteStudioProfileById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found StudioProfile with StudioID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete StudioProfile with StudioID " + req.params.id,
        });
      }
    } else {
      res.send({ message: `StudioProfile was deleted successfully!` });
    }
  });
};
