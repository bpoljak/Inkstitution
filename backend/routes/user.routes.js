module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const express = require("express");
  const router = express.Router();

  router.get("/session", (req, res) => {
    if (req.session && req.session.userId) {
      return res.send({
        userId: req.session.userId,
        userFirstName: req.session.userFirstName,
        userLastName: req.session.userLastName,
        userEmail: req.session.userEmail,
        userAccountName: req.session.userAccountName,
      });
    }
    res.status(401).send({ message: "User not logged in or session expired." });
  });
  

  router.post("/", users.createUser);

  router.get("/", users.getAllUsers);

  router.get("/:id", users.getUserById);

  router.put("/:id", users.updateUserById);

  router.delete("/:id", users.deleteUserById);

  router.post("/login", users.loginUser);

  router.post("/logout", users.logoutUser);

  app.use("/api/users", router);
};
