module.exports = app => {
    const studios = require("../controllers/studio.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Studio
    router.post("/", studios.createStudio);

    // Get all Studios
    router.get("/", studios.getAllStudios);

    // Get Studio by id
    router.get("/:id", studios.getStudioById);
  
    // Get Studio created at
    router.get("/:id/createdAt", studios.getStudioCreatedAt);

     // Get Studio updated at
    router.get("/:id/updatedAt", studios.getStudioUpdatedAt);

    // Update Studio by id
    router.put("/:id", studios.updateStudioById);

    // Delete Studio by id
    router.delete("/:id", studios.deleteStudioById);



    app.use('/api/studios', router);
  };