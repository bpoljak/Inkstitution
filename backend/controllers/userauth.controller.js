const UserAuth = require("../models/userauth.model.js");
const bcrypt = require("bcrypt");

exports.createUserAuth = (req, res) => {
  if (!req.body.userEmail || !req.body.userPassword) {
    return res.status(400).send({
      message: "Email and password are required.",
    });
  }

  const userAuth = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };

  UserAuth.createUserAuth(userAuth, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error creating user." });
    } else {
      res.send(data);
    }
  });
};

exports.getAllUserAuths = (req, res) => {
  UserAuth.getAllUserAuths((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error fetching users." });
    } else {
      res.send(data);
    }
  });
};

exports.getUserAuthById = (req, res) => {
  UserAuth.getUserAuthById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `User not found with id ${req.params.id}` });
      } else {
        res
          .status(500)
          .send({ message: `Error fetching user with id ${req.params.id}` });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateUserAuthById = (req, res) => {
  if (!req.body.userEmail || !req.body.userPassword) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  const updatedUserAuth = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };

  if (req.body.currentPassword) {
    UserAuth.getUserAuthById(req.params.id, async (err, user) => {
      if (err || !user) {
        return res.status(404).send({ message: "User not found." });
      }

      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        user.UserPassword
      );

      if (!isMatch) {
        return res
          .status(401)
          .send({ message: "Current password is incorrect." });
      }

      if (req.body.userPassword) {
        updatedUserAuth.userPassword = await bcrypt.hash(
          req.body.userPassword,
          10
        );
      }

      UserAuth.updateUserAuthById(req.params.id, updatedUserAuth, (err) => {
        if (err) {
          return res.status(500).send({ message: "Error updating user." });
        }
        res.send({ message: "User updated successfully." });
      });
    });
  } else {
    UserAuth.updateUserAuthById(req.params.id, updatedUserAuth, (err) => {
      if (err) {
        return res.status(500).send({ message: "Error updating user." });
      }
      res.send({ message: "User updated successfully." });
    });
  }
};

exports.deleteUserAuthById = (req, res) => {
  UserAuth.deleteUserAuthById(req.params.id, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `User not found with id ${req.params.id}` });
      } else {
        res
          .status(500)
          .send({ message: `Error deleting user with id ${req.params.id}` });
      }
    } else {
      res.send({ message: "User deleted successfully!" });
    }
  });
};

exports.loginUserAuth = (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  UserAuth.loginUserAuth(userEmail, userPassword, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "User not found." });
      } else if (err.kind === "invalid_password") {
        return res.status(401).send({ message: "Invalid password." });
      } else {
        return res.status(500).send({ message: "Login error." });
      }
    }

    req.session.userId = user.id;
    req.session.userEmail = user.userEmail;

    res.send({
      message: "Login successful",
      user: {
        id: user.id,
        userEmail: user.userEmail,
      },
    });
  });
};

exports.logoutUserAuth = (req, res) => {
  console.log("Logout initiated. Current session data:", req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).send({ message: "Could not log out." });
    } else {
      console.log("Session successfully destroyed.");
      res.clearCookie("connect.sid");
      res.send({ message: "Logged out successfully" });
    }
  });
};
