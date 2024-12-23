module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const appointments = require("../controllers/appointment.controller.js");

  router.post("/", appointments.createAppointment);
  router.get("/filter", appointments.getAppointmentsByDateAndStudioId);
  router.get("/", appointments.getAllAppointments);
  router.get("/studio/:id", appointments.getAllAppointmentsByStudioId);
  router.get("/user/:id", appointments.getAllAppointmentsByUserId);
  router.get("/:id", appointments.getAppointmentById);
  router.put("/:id", appointments.updateAppointmentById);
  router.delete("/:id", appointments.deleteAppointmentById);

  app.use("/api/appointments", router);
};
