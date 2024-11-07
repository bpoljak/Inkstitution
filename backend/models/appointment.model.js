const sql = require("../config/db.config");

const Appointment = function(appointment) {
    this.appointmentId = appointment.appointmentId;
    this.appointmentDate = appointment.appointmentDate;
    this.appointmentTime = appointment.appointmentTime;
  };


Appointment.createAppointment = (newAppointment, result) => {
  const createAppointmentQuery = `
    INSERT INTO Appointments (AppointmentID, AppointmentDate, AppointmentTime) 
    VALUES (?, ?, ?)`;

  sql.query(
    createAppointmentQuery,
    [
      newAppointment.appointmentDate,
      newAppointment.appointmentTime
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created appointment: ", { id: res.insertId, ...newAppointment });
      result(null, { id: res.insertId, ...newAppointment });
    }
  );
};

Appointment.getAllAppointments = (result) => {
  const getAllAppointmentsQuery = "SELECT * FROM Appointments";

  sql.query(getAllAppointmentsQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Appointment.getAppointmentById = (id, result) => {
  const getAppointmentByIdQuery = `SELECT * FROM Appointments WHERE AppointmentID = ${id}`
  sql.query(getAppointmentByIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found appointment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found appointment with the id
    result({ kind: "not_found" }, null);
  });
};

Appointment.getAllAppointmentsByStudioId = (id, result) => {
  const getAllAppointmentsByStudioIdQuery = `SELECT * FROM Appointments WHERE StudioID = ${id}`
  sql.query(getAllAppointmentsByStudioIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found appointment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found appointment with the id
    result({ kind: "not_found" }, null);
  });
};

Appointment.getAllAppointmentsByArtistId = (id, result) => {
  const getAllAppointmentsByArtistIdQuery = `SELECT * FROM Appointments WHERE ArtistID = ${id}`
  sql.query(getAllAppointmentsByArtistIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found appointment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found appointment with the id
    result({ kind: "not_found" }, null);
  });
};

Appointment.getAllAppointmentsByUserId = (id, result) => {
  const getAllAppointmentsByUserIdQuery = `SELECT * FROM Appointments WHERE UserID = ${id}`
  sql.query(getAllAppointmentsByUserIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found appointment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found appointment with the id
    result({ kind: "not_found" }, null);
  });
};

Appointment.updateAppointmentById = (id, appointment, result) => {
  const updateAppointmentQuery = `
    UPDATE Appointments 
    SET AppointmentDate = ?, AppointmentTime = ?
    WHERE AppointmentID = ?`;
    sql.query(
      updateAppointmentQuery, 
      [appointment.appointmentDate, appointment.appointmentTime, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated appointment: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };

  Appointment.deleteAppointmentById = (id, result) => {
    const deleteAppointmentByIdQuery = `DELETE FROM Appointments WHERE AppointmentID = ${id}`;
    sql.query(deleteAppointmentByIdQuery, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted appointment with id: ", id);
      result(null, res);
    });
  };

module.exports = Appointment;