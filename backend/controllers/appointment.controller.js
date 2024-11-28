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
    const data = await Appointment.getAppointmentById(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
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
    const data = await Appointment.getAllAppointmentsByUserId(req.params.id);
    if (!data.length) {
      res.status(404).send({
        message: `Not found Appointments for User with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving Appointments for User with id ${req.params.id}.`,
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
    if (!data) {
      res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error updating Appointment with id ${req.params.id}.`,
    });
  }
};

exports.deleteAppointmentById = async (req, res) => {
  try {
    const data = await Appointment.deleteAppointmentById(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Not found Appointment with id ${req.params.id}.`,
      });
    } else {
      res.send({ message: `Appointment was deleted successfully!` });
    }
  } catch (error) {
    res.status(500).send({
      message: `Could not delete Appointment with id ${req.params.id}.`,
    });
  }
};
