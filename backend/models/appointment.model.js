const knex = require("../config/db.config");

const Appointment = function (appointment) {
  this.appointmentId = appointment.appointmentId;
  this.appointmentDate = appointment.appointmentDate;
  this.appointmentTime = appointment.appointmentTime;
  this.appointmentStatus = appointment.appointmentStatus;
  this.appointmentCreatedAt = appointment.appointmentCreatedAt;
  this.appointmentUpdatedAt = appointment.appointmentUpdatedAt;
};

Appointment.createAppointment = async (newAppointment, result) => {
  try {
    const [id] = await knex("Appointments").insert({
      AppointmentDate: newAppointment.appointmentDate,
      AppointmentTime: newAppointment.appointmentTime,
      Status: newAppointment.appointmentStatus,
      CreatedAt: newAppointment.appointmentCreatedAt,
    });
    console.log("Created appointment: ", { id, ...newAppointment });
    result(null, { id, ...newAppointment });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.getAllAppointments = async (result) => {
  try {
    const appointments = await knex("Appointments").select("*");
    console.log("Appointments: ", appointments);
    result(null, appointments);
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.getAppointmentById = async (id, result) => {
  try {
    const appointment = await knex("Appointments")
      .where({ AppointmentID: id })
      .first();
    if (appointment) {
      console.log("Found appointment: ", appointment);
      result(null, appointment);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.getAllAppointmentsByStudioId = async (id, result) => {
  try {
    const appointments = await knex("Appointments").where({ StudioID: id });
    if (appointments.length) {
      console.log("Found appointments: ", appointments);
      result(null, appointments);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.getAllAppointmentsByArtistId = async (id, result) => {
  try {
    const appointments = await knex("Appointments").where({ ArtistID: id });
    if (appointments.length) {
      console.log("Found appointments: ", appointments);
      result(null, appointments);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.getAllAppointmentsByUserId = async (id, result) => {
  try {
    const appointments = await knex("Appointments").where({ UserID: id });
    if (appointments.length) {
      console.log("Found appointments: ", appointments);
      result(null, appointments);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.updateAppointmentById = async (id, appointment, result) => {
  try {
    const updatedRows = await knex("Appointments")
      .where({ AppointmentID: id })
      .update({
        AppointmentDate: appointment.appointmentDate,
        AppointmentTime: appointment.appointmentTime,
      });

    if (updatedRows) {
      console.log("Updated appointment: ", { id, ...appointment });
      result(null, { id, ...appointment });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

Appointment.deleteAppointmentById = async (id, result) => {
  try {
    const deletedRows = await knex("Appointments")
      .where({ AppointmentID: id })
      .del();
    if (deletedRows) {
      console.log("Deleted appointment with id: ", id);
      result(null, deletedRows);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = Appointment;
