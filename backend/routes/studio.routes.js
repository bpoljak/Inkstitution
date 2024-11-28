module.exports = (app) => {
  const studios = require("../controllers/studio.controller.js");
  const router = require("express").Router();

  router.post("/", studios.createStudio);
  router.get("/", studios.getAllStudios);
  router.get("/:id", studios.getStudioById);
  router.get("/:id/createdAt", studios.getStudioCreatedAt);
  router.get("/:id/updatedAt", studios.getStudioUpdatedAt);
  router.put("/:id", studios.updateStudioById);
  router.delete("/:id", studios.deleteStudioById);

  app.use("/api/studios", router);
};
