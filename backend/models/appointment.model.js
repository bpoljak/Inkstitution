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

Appointment.getAppointmentById = async (id) => {
  try {
    const appointment = await knex("Appointments")
      .where({ AppointmentID: id })
      .first();
    return appointment;
  } catch (err) {
    console.error("Error fetching appointment by ID:", err.message);
    throw err;
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

Appointment.getAllAppointmentsByUserId = async (userId) => {
  try {
    const appointments = await knex("Appointments")
      .join("Studios", "Appointments.StudioID", "=", "Studios.StudioID")
      .leftJoin(
        "StudioImages",
        "Studios.StudioID",
        "=",
        "StudioImages.StudioID"
      )
      .select(
        "Appointments.AppointmentID",
        "Appointments.AppointmentDate",
        "Appointments.AppointmentTime",
        "Appointments.Status",
        "Studios.StudioName",
        "Studios.StudioCity",
        "Studios.StudioAddress",
        "StudioImages.StudioProfileImageLink"
      )
      .where("Appointments.UserID", userId);

    return appointments;
  } catch (err) {
    console.error("Error fetching appointments by UserID:", err.message);
    throw err;
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

Appointment.deleteAppointmentById = async (id) => {
  try {
    const deletedRows = await knex("Appointments")
      .where({ AppointmentID: id })
      .del();
    if (deletedRows) {
      console.log("Deleted appointment with id: ", id);
      return { success: true, message: `Appointment with ID ${id} deleted.` };
    } else {
      console.log("Appointment not found with id: ", id);
      return { success: false, message: "Appointment not found." };
    }
  } catch (err) {
    console.error("Error deleting appointment: ", err);
    throw new Error("Failed to delete the appointment.");
  }
};

module.exports = Appointment;
