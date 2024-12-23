const Appointment = require("../models/appointment.model.js");

exports.createAppointment = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const appointment = {
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    appointmentStatus: "Pending",
    studioId: req.body.studioId,
    userId: req.body.userId,
  };

  try {
    const data = await Appointment.createAppointment(appointment);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Appointment.",
    });
  }
};

exports.getAppointmentsByDateAndStudioId = async (req, res) => {
  const { date, studioId } = req.query;

  if (!date || !studioId) {
    return res.status(400).send({ message: "Date and studioId are required." });
  }

  try {
    const appointments = await Appointment.getAppointmentsByDateAndStudioId(
      date,
      studioId
    );
    res.send(appointments);
  } catch (error) {
    res.status(500).send({ message: "Error fetching appointments." });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const data = await Appointment.getAllAppointments();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving appointments.",
    });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.getAppointmentById(req.params.id);
    res.send(appointment);
  } catch (error) {
    if (error.kind === "not_found") {
      return res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    }
    res.status(500).send({
      message: `Error retrieving Appointment with id ${req.params.id}.`,
    });
  }
};

exports.getAllAppointmentsByStudioId = async (req, res) => {
  try {
    const data = await Appointment.getAllAppointmentsByStudioId(req.params.id);
    res.send(data);
  } catch (error) {
    if (error.kind === "not_found") {
      return res.status(404).send({
        message: `Not found Appointments for Studio with id ${req.params.id}.`,
      });
    }
    res.status(500).send({
      message: `Error retrieving Appointments for Studio with id ${req.params.id}.`,
    });
  }
};

exports.getAllAppointmentsByUserId = async (req, res) => {
  try {
    const appointments = await Appointment.getAllAppointmentsByUserId(
      req.params.id
    );
    res.send(appointments);
  } catch (error) {
    if (error.kind === "not_found") {
      return res
        .status(404)
        .send({ message: "No appointments found for this user." });
    }
    res.status(500).send({
      message: "Error fetching appointments for user.",
    });
  }
};

exports.updateAppointmentById = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const appointment = {
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
  };

  try {
    const data = await Appointment.updateAppointmentById(
      req.params.id,
      appointment
    );
    res.send(data);
  } catch (error) {
    if (error.kind === "not_found") {
      return res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    }
    res.status(500).send({
      message: `Error updating Appointment with id ${req.params.id}.`,
    });
  }
};

exports.deleteAppointmentById = async (req, res) => {
  try {
    const result = await Appointment.deleteAppointmentById(req.params.id);
    res.send({ message: result.message });
  } catch (error) {
    if (error.message === "Appointment not found.") {
      return res.status(404).send({ message: "Appointment not found." });
    }
    res.status(500).send({
      message: "An error occurred while deleting the appointment.",
    });
  }
};
