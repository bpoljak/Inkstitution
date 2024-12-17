const Appointment = require("../models/appointment.model.js");

exports.createAppointment = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const appointment = {
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    appointmentStatus: "Pending",
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
    if (!appointment) {
      return res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    }
    res.send(appointment);
  } catch (error) {
    console.error("Error retrieving Appointment by ID:", error.message);
    res.status(500).send({
      message: `Error retrieving Appointment with id ${req.params.id}.`,
    });
  }
};

exports.getAllAppointmentsByStudioId = async (req, res) => {
  try {
    const data = await Appointment.getAllAppointmentsByStudioId(req.params.id);
    if (!data.length) {
      res.status(404).send({
        message: `Not found Appointments for Studio with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving Appointments for Studio with id ${req.params.id}.`,
    });
  }
};

exports.getAllAppointmentsByArtistId = async (req, res) => {
  try {
    const data = await Appointment.getAllAppointmentsByArtistId(req.params.id);
    if (!data.length) {
      res.status(404).send({
        message: `Not found Appointments for Artist with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving Appointments for Artist with id ${req.params.id}.`,
    });
  }
};

exports.getAllAppointmentsByUserId = async (req, res) => {
  try {
    const appointments = await Appointment.getAllAppointmentsByUserId(
      req.params.id
    );

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .send({ message: "No appointments found for this user." });
    }

    res.send(appointments);
  } catch (error) {
    console.error("Error in controller fetching appointments:", error.message);
    res.status(500).send({
      message: "Error fetching appointments for user.",
      error: error.message,
    });
  }
};

exports.updateAppointmentById = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
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

    if (data.kind === "not_found") {
      return res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: `Error updating Appointment with id ${req.params.id}.`,
    });
  }
};

exports.deleteAppointmentById = async (req, res) => {
  try {
    const result = await Appointment.deleteAppointmentById(req.params.id);

    if (result.success) {
      res.send({ message: result.message });
    } else {
      res.status(404).send({ message: result.message });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    res.status(500).send({
      message: "An error occurred while deleting the appointment.",
    });
  }
};
