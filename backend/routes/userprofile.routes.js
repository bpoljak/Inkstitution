module.exports = (app) => {
  const userProfiles = require("../controllers/userprofile.controller.js");
  const express = require("express");
  const router = express.Router();

  router.post("/", userProfiles.createUserProfile);

  router.get("/", userProfiles.getAllUserProfiles);

  router.get("/:id", userProfiles.getUserProfileById);

  router.put("/:id", userProfiles.updateUserProfileById);

  router.delete("/:id", userProfiles.deleteUserProfileById);

  app.use("/api/userprofiles", router);
};
