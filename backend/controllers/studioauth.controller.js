const StudioAuth = require("../models/studioauth.model.js");
const bcrypt = require("bcrypt");

exports.createStudioAuth = (req, res) => {
  if (!req.body.studioEmail || !req.body.studioPassword) {
    return res.status(400).send({
      message: "Email and password are required.",
    });
  }

  const newStudioAuth = {
    studioEmail: req.body.studioEmail,
    studioPassword: req.body.studioPassword,
  };

  StudioAuth.createStudioAuth(newStudioAuth, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error creating studio." });
    } else {
      res.send(data);
    }
  });
};

exports.getAllStudioAuths = (req, res) => {
  StudioAuth.getAllStudioAuths((err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: err.message || "Error fetching studios." });
    } else {
      res.send(data);
    }
  });
};

exports.getStudioAuthById = (req, res) => {
  StudioAuth.getStudioAuthById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Studio not found with id ${req.params.id}` });
      } else {
        res
          .status(500)
          .send({ message: `Error fetching studio with id ${req.params.id}` });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateStudioAuthById = (req, res) => {
  if (!req.body.studioEmail || !req.body.studioPassword) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  const updatedStudioAuth = {
    studioEmail: req.body.studioEmail,
    studioPassword: req.body.studioPassword,
  };

  if (req.body.currentPassword) {
    StudioAuth.getStudioAuthById(req.params.id, async (err, studio) => {
      if (err || !studio) {
        return res.status(404).send({ message: "Studio not found." });
      }

      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        studio.StudioPassword
      );

      if (!isMatch) {
        return res
          .status(401)
          .send({ message: "Current password is incorrect." });
      }

      if (req.body.studioPassword) {
        updatedStudioAuth.studioPassword = await bcrypt.hash(
          req.body.studioPassword,
          10
        );
      }

      StudioAuth.updateStudioAuthById(
        req.params.id,
        updatedStudioAuth,
        (err) => {
          if (err) {
            return res.status(500).send({ message: "Error updating studio." });
          }
          res.send({ message: "Studio updated successfully." });
        }
      );
    });
  } else {
    StudioAuth.updateStudioAuthById(req.params.id, updatedStudioAuth, (err) => {
      if (err) {
        return res.status(500).send({ message: "Error updating studio." });
      }
      res.send({ message: "Studio updated successfully." });
    });
  }
};

exports.deleteStudioAuthById = (req, res) => {
  StudioAuth.deleteStudioAuthById(req.params.id, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Studio not found with id ${req.params.id}` });
      } else {
        res
          .status(500)
          .send({ message: `Error deleting studio with id ${req.params.id}` });
      }
    } else {
      res.send({ message: "Studio deleted successfully!" });
    }
  });
};

exports.loginStudioAuth = (req, res) => {
  const { studioEmail, studioPassword } = req.body;

  if (!studioEmail || !studioPassword) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  StudioAuth.loginStudioAuth(studioEmail, studioPassword, (err, studio) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "Studio not found." });
      } else if (err.kind === "invalid_password") {
        return res.status(401).send({ message: "Invalid password." });
      } else {
        return res.status(500).send({ message: "Login error." });
      }
    }

    req.session.studioId = studio.id;
    req.session.studioEmail = studio.studioEmail;

    res.send({
      message: "Login successful",
      studio: {
        id: studio.id,
        studioEmail: studio.studioEmail,
      },
    });
  });
};

exports.logoutStudioAuth = (req, res) => {
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
