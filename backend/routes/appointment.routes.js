const express = require("express");
const router = express.Router();
const appointments = require("../controllers/appointment.controller.js");

router.post("/", appointments.createAppointment);
router.get("/", appointments.getAllAppointments);
router.get("/:id", appointments.getAppointmentById);
router.get("/studio/:id", appointments.getAllAppointmentsByStudioId);
router.get("/artist/:id", appointments.getAllAppointmentsByArtistId);
router.get("/user/:id", appointments.getAllAppointmentsByUserId);
router.put("/:id", appointments.updateAppointmentById);
router.delete("/:id", appointments.deleteAppointmentById);

module.exports = router;
