const User = require("../models/user.model.js");

exports.createUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userAccountName: req.body.userAccountName,
    userPassword: req.body.userPassword,
  };

  User.createUser(user, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error creating user." });
    } else {
      res.send(data);
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error fetching users." });
    } else {
      res.send(data);
    }
  });
};

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, data) => {
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

exports.updateUserById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const updatedUser = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userAccountName: req.body.userAccountName,
    userPassword: req.body.userPassword,
  };

  User.updateUserById(req.params.id, updatedUser, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `User not found with id ${req.params.id}` });
      } else {
        res
          .status(500)
          .send({ message: `Error updating user with id ${req.params.id}` });
      }
    } else {
      res.send(data);
    }
  });
};

exports.deleteUserById = (req, res) => {
  User.deleteUserById(req.params.id, (err, data) => {
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

exports.loginUser = (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).send({ message: "Email i lozinka su obavezni!" });
  }

  User.loginUser(userEmail, userPassword, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "Korisnik nije pronađen." });
      } else if (err.kind === "invalid_password") {
        return res.status(401).send({ message: "Neispravna lozinka." });
      } else {
        return res.status(500).send({ message: "Greška prilikom prijave." });
      }
    }

    req.session.userId = user.id;
    req.session.userName = user.userFirstName;
    req.session.userEmail = user.userEmail;

    res.send({ message: "Prijava uspješna", userName: user.userFirstName });
  });
};

exports.logoutUser = (req, res) => {
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
