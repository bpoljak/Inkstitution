const express = require("express");
const emailController = require("../controllers/email.controller");

module.exports = (app) => {
  const router = express.Router();

  router.post("/send", emailController.receiveEmailFromUser);
  router.get("/current-user-email", (req, res) => {
    if (req.session.userEmail) {
      return res.status(200).send({ email: req.session.userEmail });
    }
    res.status(401).send({ message: "Korisnik nije prijavljen." });
  });

  app.use("/api/emails", router);
};
