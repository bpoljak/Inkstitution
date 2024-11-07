const Appointment = require("../models/appointment.model.js");

exports.createAppointment = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const appointment = new Appointment({
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime
    });
  
    Appointment.createAppointment(appointment, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Appointment."
        });
      else res.send(data);
    });
};

exports.getAllAppointments = (req, res) => {
    Appointment.getAllAppointments((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving appointments."
        });
      else res.send(data);
    });
};

exports.getAppointmentById = (req, res) => {
    Appointment.getAppointmentById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Appointment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Appointment with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.getAllAppointmentsByStudioId = (req, res) => {
    Appointment.getAllAppointmentsByStudioId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Appointments for Studio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Appointments for Studio with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.getAllAppointmentsByArtistId = (req, res) => {
    Appointment.getAllAppointmentsByArtistId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Appointments for Artist with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Appointments for Artist with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.getAllAppointmentsByUserId = (req, res) => {
    Appointment.getAllAppointmentsByUserId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Appointments for User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Appointments for User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.updateAppointmentById = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    Appointment.updateAppointmentById(
      req.params.id,
      new Appointment(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Appointment with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Appointment with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
};

exports.deleteAppointmentById = (req, res) => {
    Appointment.deleteAppointmentById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Appointment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Appointment with id " + req.params.id
          });
        }
      } else res.send({ message: `Appointment was deleted successfully!` });
    });
};
