const Artist = require("../models/artist.model");

exports.createArtist = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const artist = new Artist({
    artistName: req.body.artistName,
    artistProfileImageLink: req.body.artistProfileImageLink,
  });

  Artist.createArtist(artist, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the artist.",
      });
    else res.send(data);
  });
};

exports.getAllArtists = (req, res) => {
  Artist.getAllArtists((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving artists.",
      });
    else res.send(data);
  });
};

exports.getArtistById = (req, res) => {
  Artist.getArtistById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found artist with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving artist with id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

exports.updateArtistById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Artist.updateArtistById(req.params.id, new Artist(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found artist with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating artist with id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

exports.deleteArtistById = (req, res) => {
  Artist.deleteArtistById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found artist with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete artist with id ${req.params.id}.`,
        });
      }
    } else res.send({ message: `Artist was deleted successfully!` });
  });
};
