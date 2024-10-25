const Studio = require("../models/studio.model.js");

exports.createStudio = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Studio
    const studio = new Studio({
        studioName: req.body.studioName,
        studioAddress: req.body.studioAddress,
        studioWorkingHours: req.body.studioWorkingHours,
        studioEmail: req.body.studioEmail,
        studioAccountName: req.body.studioAccountName,
        studioPassword: req.body.studioPassword,
        studioCreatedAt: req.body.studioCreatedAt,
        studioUpdatedAt: req.body.studioUpdatedAt
    });
  
    // Save Studio in the database
    Studio.createStudio(studio, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Studio."
        });
      else res.send(data);
    });
  };

  // Retrieve all Studios from the database.
exports.getAllStudios = (req, res) => {
    Studio.getAllStudios((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all studios."
        });
      else res.send(data);
    });
  };

exports.getStudioById = (req, res) => {
    Studio.getStudioById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Studio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Studio with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

exports.getStudioCreatedAt = (req, res) => {
    Studio.getStudioCreatedAt(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Studio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Studio with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

exports.getStudioUpdatedAt = (req, res) => {
    Studio.getStudioUpdatedAt(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Studio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Studio with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

exports.updateStudioById = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Studio.updateStudioById(
      req.params.id,
      new Studio(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Studio with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Studio with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };  


  exports.deleteStudioById = (req, res) => {
    Studio.deleteStudioById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Studio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Studio with id " + req.params.id
          });
        }
      } else res.send({ message: `Studio was deleted successfully!` });
    });
  };
  