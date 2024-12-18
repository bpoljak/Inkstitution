module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const studioProfileImages = require("../controllers/studioprofileimage.controller.js");

  router.post("/", studioProfileImages.createStudioProfileImage);
  router.get(
    "/:studioId",
    studioProfileImages.getStudioProfileImagesByStudioId
  );
  router.put("/:id", studioProfileImages.updateStudioProfileImageById);
  router.delete("/:id", studioProfileImages.deleteStudioProfileImageById);

  app.use("/api/studioProfileImages", router);
};
