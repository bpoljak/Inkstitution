module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const userProfileImages = require("../controllers/userprofileimage.controller.js");

  router.post("/", userProfileImages.createuserProfileImage);
  router.get("/:userId", userProfileImages.getuserProfileImagesByuserId);
  router.put("/:id", userProfileImages.updateuserProfileImageById);
  router.delete("/:id", userProfileImages.deleteuserProfileImageById);

  app.use("/api/userProfileImages", router);
};
