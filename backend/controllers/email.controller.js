const nodemailer = require("nodemailer");

exports.receiveEmailFromUser = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const { subject, message } = req.body;

    if (!userEmail || !subject || !message) {
      return res.status(400).send({ message: "Sva polja su obavezna." });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: userEmail,
      to: process.env.EMAIL_USER,
      subject: `Poruka od ${userEmail}: ${subject}`,
      text: message,
    });

    res.status(200).send({ message: "Vaša poruka je uspješno poslana!" });
  } catch (error) {
    console.error("Greška pri slanju emaila:", error);
    res
      .status(500)
      .send({ message: "Slanje poruke nije uspjelo.", error: error.message });
  }
};
