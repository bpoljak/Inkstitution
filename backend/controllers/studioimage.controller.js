const StudioImage = require("../models/studioimage.model.js");

exports.createStudioImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const studioImage = new StudioImage({
    studioImageDescription: req.body.studioImageDescription,
    studioImageLink: req.body.studioImageLink,
    studioProfileImageLink: req.body.studioProfileImageLink,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  StudioImage.createStudioImage(studioImage, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the studio image.",
      });
    else res.send(data);
  });
};

exports.getAllStudioImages = (req, res) => {
  StudioImage.getAllStudioImages((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studio images.",
      });
    } else {
      res.send(data);
    }
  });
};


exports.getStudioImageById = (req, res) => {
  StudioImage.getStudioImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving studio image with id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

exports.updateStudioImageById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  StudioImage.updateStudioImageById(req.params.id, new StudioImage(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating studio image with id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

exports.deleteStudioImageById = (req, res) => {
  StudioImage.deleteStudioImageById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete studio image with id ${req.params.id}.`,
        });
      }
    } else res.send({ message: `Studio image was deleted successfully!` });
  });
};

exports.getStudioImageCreatedAt = (req, res) => {
  StudioImage.getStudioImageCreatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving createdAt for studio image with id ${req.params.id}.`,
        });
      }
    } else res.send({ createdAt: data.createdAt });
  });
};

exports.getStudioImageUpdatedAt = (req, res) => {
  StudioImage.getStudioImageUpdatedAt(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving updatedAt for studio image with id ${req.params.id}.`,
        });
      }
    } else res.send({ updatedAt: data.updatedAt });
  });
};

exports.updateStudioImageTimestamp = (req, res) => {
  StudioImage.updateStudioImageTimestamp(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found studio image with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating timestamp for studio image with id ${req.params.id}.`,
        });
      }
    } else res.send({ message: `Studio image timestamp was updated successfully!` });
  });
};
