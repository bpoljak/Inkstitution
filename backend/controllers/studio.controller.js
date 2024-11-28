const Studio = require("../models/studio.model.js");

exports.createStudio = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const studio = {
    studioName: req.body.studioName,
    studioAddress: req.body.studioAddress,
    studioWorkingHours: req.body.studioWorkingHours,
    studioEmail: req.body.studioEmail,
    studioAccountName: req.body.studioAccountName,
    studioPassword: req.body.studioPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  Studio.createStudio(studio, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Studio.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Studios from the database.
exports.getAllStudios = (req, res) => {
  Studio.getAllStudios((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all studios.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getStudioById = (req, res) => {
  Studio.getStudioById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Studio with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Studio with id " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.getStudioCreatedAt = (req, res) => {
  Studio.getStudioCreatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Studio with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving createdAt for Studio with id " + req.params.id,
        });
      }
    } else {
      res.send({ createdAt: data.CreatedAt });
    }
  });
};

exports.getStudioUpdatedAt = (req, res) => {
  Studio.getStudioUpdatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Studio with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving updatedAt for Studio with id " + req.params.id,
        });
      }
    } else {
      res.send({ updatedAt: data.UpdatedAt });
    }
  });
};

exports.updateStudioById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const updatedStudio = {
    studioName: req.body.studioName,
    studioAddress: req.body.studioAddress,
    studioWorkingHours: req.body.studioWorkingHours,
    studioEmail: req.body.studioEmail,
    studioAccountName: req.body.studioAccountName,
    studioPassword: req.body.studioPassword,
    updatedAt: new Date(),
  };

  Studio.updateStudioById(req.params.id, updatedStudio, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Studio with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Studio with id " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.deleteStudioById = (req, res) => {
  Studio.deleteStudioById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Studio with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Studio with id " + req.params.id,
        });
      }
    } else {
      res.send({ message: `Studio was deleted successfully!` });
    }
  });
};
