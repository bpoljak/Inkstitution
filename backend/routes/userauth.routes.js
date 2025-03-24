module.exports = (app) => {
  const userAuth = require("../controllers/userauth.controller.js");
  const express = require("express");
  const router = express.Router();

  router.get("/session", (req, res) => {
    if (req.session && req.session.userId) {
      return res.send({
        userId: req.session.userId,
        userEmail: req.session.userEmail,
      });
    }
    res.status(401).send({ message: "User not logged in or session expired." });
  });

  router.post("/", userAuth.createUserAuth);

  router.get("/", userAuth.getAllUserAuths);

  router.get("/:id", userAuth.getUserAuthById);

  router.put("/:id", userAuth.updateUserAuthById);

  router.delete("/:id", userAuth.deleteUserAuthById);

  router.post("/login", userAuth.loginUserAuth);

  router.post("/logout", userAuth.logoutUserAuth);

  app.use("/api/userauth", router);
};
