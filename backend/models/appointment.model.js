const knex = require("../config/db.config");

const Appointment = function (appointment) {
  this.appointmentId = appointment.appointmentId;
  this.appointmentDate = appointment.appointmentDate;
  this.appointmentTime = appointment.appointmentTime;
  this.appointmentStatus = appointment.appointmentStatus;
  this.appointmentCreatedAt = appointment.appointmentCreatedAt;
  this.appointmentUpdatedAt = appointment.appointmentUpdatedAt;
};

Appointment.createAppointment = async (newAppointment) => {
  const [id] = await knex("Appointments").insert({
    StudioID: newAppointment.studioId,
    UserID: newAppointment.userId,
    AppointmentDate: newAppointment.appointmentDate,
    AppointmentTime: newAppointment.appointmentTime,
    Status: newAppointment.appointmentStatus,
    CreatedAt: newAppointment.appointmentCreatedAt,
  });
  return { id, ...newAppointment };
};

Appointment.getAppointmentsByDateAndStudioId = async (date, studioId) => {
  const appointments = await knex("Appointments")
    .select("AppointmentTime")
    .where({
      AppointmentDate: date,
      StudioID: studioId,
    });
  return appointments;
};

Appointment.getAllAppointments = async () => {
  const appointments = await knex("Appointments").select("*");
  return appointments;
};

Appointment.getAppointmentById = async (id) => {
  const appointment = await knex("Appointments")
    .join("Studios", "Appointments.StudioID", "=", "Studios.StudioID")
    .select(
      "Appointments.AppointmentID",
      "Appointments.AppointmentDate",
      "Appointments.AppointmentTime",
      "Appointments.Status",
      "Appointments.UserID",
      "Studios.StudioName"
    )
    .where("Appointments.AppointmentID", id)
    .first();

  if (!appointment) {
    throw { kind: "not_found" };
  }

  return appointment;
};

Appointment.getAllAppointmentsByStudioId = async (id) => {
  const appointments = await knex("Appointments").where({ StudioID: id });
  if (!appointments.length) {
    throw { kind: "not_found" };
  }
  return appointments;
};

Appointment.getAllAppointmentsByArtistId = async (id) => {
  const appointments = await knex("Appointments").where({ ArtistID: id });
  if (!appointments.length) {
    throw { kind: "not_found" };
  }
  return appointments;
};

Appointment.getAllAppointmentsByUserId = async (userId) => {
  const appointments = await knex("Appointments")
    .join("Studios", "Appointments.StudioID", "=", "Studios.StudioID")
    .leftJoin(
      "StudioProfileImages",
      "Studios.StudioID",
      "=",
      "StudioProfileImages.StudioID"
    )
    .select(
      "Appointments.AppointmentID",
      "Appointments.AppointmentDate",
      "Appointments.AppointmentTime",
      "Appointments.Status",
      "Studios.StudioName",
      "Studios.StudioCity",
      "Studios.StudioAddress",
      "StudioProfileImages.StudioProfileImageLink"
    )
    .where("Appointments.UserID", userId);

  if (!appointments.length) {
    throw { kind: "not_found" };
  }

  return appointments;
};

Appointment.updateAppointmentById = async (id, appointment) => {
  const updatedRows = await knex("Appointments")
    .where({ AppointmentID: id })
    .update({
      AppointmentDate: appointment.appointmentDate,
      AppointmentTime: appointment.appointmentTime,
      Status: "Pending",
    });

  if (!updatedRows) {
    throw { kind: "not_found" };
  }

  return { id, ...appointment };
};

Appointment.deleteAppointmentById = async (id) => {
  const deletedRows = await knex("Appointments")
    .where({ AppointmentID: id })
    .del();

  if (!deletedRows) {
    throw new Error("Appointment not found.");
  }

  return { success: true, message: `Appointment with ID ${id} deleted.` };
};

module.exports = Appointment;
