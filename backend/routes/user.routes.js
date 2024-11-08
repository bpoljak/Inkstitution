module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/session", (req, res) => {
    if (req.session.userId) {
      res.send({ userName: req.session.userName });
    } else {
      res.status(401).send({ message: "Not logged in" });
    }
  });

  // Create a new User
  router.post("/", users.createUser);

  // Get all users
  router.get("/", users.getAllUsers);

  // Get user by id
  router.get("/:id", users.getUserById);

  // Update user by id
  router.put("/:id", users.updateUserById);

  // Delete user by id
  router.delete("/:id", users.deleteUserById);

  // Login user
  router.post("/login", users.loginUser);

  //Logout user
  router.post("/logout", users.logoutUser);

  app.use("/api/users", router);
};
