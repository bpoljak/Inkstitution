module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const studioImages = require("../controllers/studioimage.controller.js");

  router.post("/", studioImages.createStudioImage);
  router.get("/", studioImages.getAllStudioImages);
  router.get("/:id", studioImages.getStudioImageById);
  router.get("/:studioId", studioImages.getStudioImagesByStudioId);
  router.put("/:id", studioImages.updateStudioImageById);
  router.delete("/:id", studioImages.deleteStudioImageById);
  router.get("/:id/createdAt", studioImages.getStudioImageCreatedAt);
  router.get("/:id/updatedAt", studioImages.getStudioImageUpdatedAt);
  router.put("/:id/updateTimestamp", studioImages.updateStudioImageTimestamp);

  app.use("/api/studioImages", router);
};
