module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    const router = require("express").Router();
  
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



    app.use('/api/users', router);
  };