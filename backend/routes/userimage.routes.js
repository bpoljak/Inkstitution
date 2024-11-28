module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const userImages = require("../controllers/userimage.controller.js");

  router.post("/", userImages.createUserImage);

  router.get("/", userImages.getAllUserImages);

  router.get("/:id", userImages.getUserImageById);

  router.put("/:id", userImages.updateUserImageById);

  router.delete("/:id", userImages.deleteUserImageById);

  router.get("/:id/updatedAt", userImages.getUserImageUpdatedAt);

  router.get("/:id/createdAt", userImages.getUserImageCreatedAt);

  app.use("/api/userimages", router);
};
