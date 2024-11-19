const User = require("../models/user.model.js");

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new User({
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userAccountName: req.body.userAccountName,
    userPassword: req.body.userPassword,
  });

  User.createUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all users.",
      });
    else res.send(data);
  });
};

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updateUserById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  User.updateUserById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteUserById = (req, res) => {
  User.deleteUserById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

exports.loginUser = (req, res) => {
  const { userEmail, userPassword } = req.body;

  User.loginUser(userEmail, userPassword, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "User not found." });
      } else if (err.kind === "invalid_password") {
        res.status(401).send({ message: "Invalid password." });
      } else {
        res.status(500).send({ message: "Error logging in." });
      }
    } else {
      req.session.userId = user.UserID;
      req.session.userName = user.UserFirstName;
      req.session.userEmail = user.UserEmail;
      res.send({ message: "Login successful", userName: user.UserFirstName });
    }
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Could not log out." });
    }
    res.send({ message: "Logged out successfully" });
  });
};

exports.getCurrentUserEmail = (req, res) => {
  if (req.session.userId) {
    User.getUserById(req.session.userId, (err, user) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Pogreška prilikom dohvaćanja korisnika." });
      } else {
        res.send({ email: user.userEmail });
      }
    });
  } else {
    res.status(401).send({ message: "Korisnik nije prijavljen." });
  }
};
