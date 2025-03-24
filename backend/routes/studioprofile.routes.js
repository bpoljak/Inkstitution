module.exports = (app) => {
  const studioProfiles = require("../controllers/studioprofile.controller.js");
  const express = require("express");
  const router = express.Router();

  router.post("/", studioProfiles.createStudioProfile);

  router.get("/", studioProfiles.getAllStudioProfiles);

  router.get("/:id", studioProfiles.getStudioProfileById);

  router.put("/:id", studioProfiles.updateStudioProfileById);

  router.delete("/:id", studioProfiles.deleteStudioProfileById);

  app.use("/api/studioprofiles", router);
};
