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
    createAftercareProductQuery,
    [
      newAftercareProduct.aftercareProductName,
      newAftercareProduct.aftercareProductDescription,
      newAftercareProduct.aftercareProductPrice,
      newAftercareProduct.aftercareProductImage
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created aftercareproduct: ", { id: res.insertId, ...newAftercareProduct });
      result(null, { id: res.insertId, ...newAftercareProduct });
    }
  );
};