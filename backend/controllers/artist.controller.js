const Artist = require("../models/artist.model");

exports.createArtist = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const artist = {
    artistName: req.body.artistName,
    artistProfileImageLink: req.body.artistProfileImageLink,
  };

  try {
    const data = await Artist.createArtist(artist);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the artist.",
    });
  }
};

exports.getAllArtists = async (req, res) => {
  try {
    const data = await Artist.getAllArtists();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving artists.",
    });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const data = await Artist.getArtistById(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Not found artist with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving artist with id ${req.params.id}.`,
    });
  }
};

exports.updateArtistById = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const artist = {
    artistName: req.body.artistName,
    artistProfileImageLink: req.body.artistProfileImageLink,
  };

  try {
    const data = await Artist.updateArtistById(req.params.id, artist);
    if (!data) {
      res.status(404).send({
        message: `Not found artist with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error updating artist with id ${req.params.id}.`,
    });
  }
};

exports.deleteArtistById = async (req, res) => {
  try {
    const data = await Artist.deleteArtistById(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Not found artist with id ${req.params.id}.`,
      });
    } else {
      res.send({ message: `Artist was deleted successfully!` });
    }
  } catch (error) {
    res.status(500).send({
      message: `Could not delete artist with id ${req.params.id}.`,
    });
  }
};
