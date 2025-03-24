module.exports = (app) => {
  const studioAuth = require("../controllers/studioauth.controller.js");
  const express = require("express");
  const router = express.Router();

  router.get("/session", (req, res) => {
    if (req.session && req.session.studioId) {
      return res.send({
        studioId: req.session.studioId,
        studioEmail: req.session.studioEmail,
      });
    }
    res
      .status(401)
      .send({ message: "Studio not logged in or session expired." });
  });

  router.post("/", studioAuth.createStudioAuth);

  router.get("/", studioAuth.getAllStudioAuths);

  router.get("/:id", studioAuth.getStudioAuthById);

  router.put("/:id", studioAuth.updateStudioAuthById);

  router.delete("/:id", studioAuth.deleteStudioAuthById);

  router.post("/login", studioAuth.loginStudioAuth);

  router.post("/logout", studioAuth.logoutStudioAuth);

  app.use("/api/studioauth", router);
};
