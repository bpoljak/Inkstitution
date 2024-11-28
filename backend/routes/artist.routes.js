module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const artists = require("../controllers/artist.controller");

  router.post("/", artists.createArtist);
  router.get("/", artists.getAllArtists);
  router.get("/:id", artists.getArtistById);
  router.put("/:id", artists.updateArtistById);
  router.delete("/:id", artists.deleteArtistById);

  app.use("/api/artists", router);
};
