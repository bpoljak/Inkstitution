const sql = require("./db.js");

const Appointment = function(appointment) {
    this.appointmentId = appointment.appointmentId;
    this.appointmentDate = appointment.appointmentDate;
    this.appointmentTime = appointment.appointmentTime;
  };