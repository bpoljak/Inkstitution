const sql = require("../config/db.config");

const UserImage = function(userImage) {
    this.userImageId = userImage.userImageId;
    this.userImageDescription = userImage.userImageDescription;
    this.userImageLink = userImage.userImageLink;
    this.profileImageLink = userImage.profileImageLink;
};

// Create User Image
UserImage.createUserImage = (newUserImage, result) => {
    const createUserImageQuery = `
      INSERT INTO UserImages (UserImageDescription, UserImageLink, UserProfileImageLink) 
      VALUES (?, ?, ?)`;
  
    sql.query(
      createUserImageQuery, 
      [newUserImage.userImageDescription, newUserImage.userImageLink, newUserImage.profileImageLink], 
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        console.log("Created user image: ", { id: res.insertId, ...newUserImage });
        result(null, { id: res.insertId, ...newUserImage });
      }
    );
};

// Get all user images
UserImage.getAllUserImages = (result) => {
    const getAllUserImagesQuery = "SELECT * FROM UserImages";
    sql.query(getAllUserImagesQuery, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("User Images: ", res);
        result(null, res);
    });
};

// Update User Image
UserImage.updateUserImageById = (id, userImage, result) => {
    const updateUserImageByIdQuery = `
      UPDATE UserImages 
      SET UserImageDescription = ?, UserImageLink = ?, UserProfileImageLink = ?
      WHERE UserImageID = ?`;
    sql.query(
      updateUserImageByIdQuery, 
      [userImage.userImageDescription, userImage.userImageLink, userImage.profileImageLink, id],
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
        console.log("Updated user image: ", { id: id, ...userImage });
        result(null, { id: id, ...userImage });
      }
    );
};

// Delete User Image
UserImage.deleteUserImageById = (id, result) => {
    const deleteUserImageByIdQuery = `DELETE FROM UserImages WHERE UserImageID = ?`;
    sql.query(deleteUserImageByIdQuery, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted User Image with id: ", id);
        result(null, res);
    });
};

// Get User Image Created At
UserImage.getUserImageCreatedAt = (id, result) => {
    const getUserImageCreatedAt = `SELECT CreatedAt FROM UserImages WHERE UserImageID = ?`;
    sql.query(getUserImageCreatedAt, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("User Image created at: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

UserImage.getUserImageById = (id, result) => {
  const getUserImageByIdQuery = `SELECT * FROM UserImages WHERE UserImageID = ${id}`
  sql.query(getUserImageByIdQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user image: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

UserImage.getUserImageUpdatedAt = (id, result) => {
  const getUserImageUpdatedAt = `SELECT UpdatedAt FROM UserImages WHERE UserImageID = ?`;
  sql.query(getUserImageUpdatedAt, [id], (err, res) => {
      if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
      }
      if (res.length) {
          console.log("User images updated created at: ", res[0]);
          result(null, res[0]);
          return;
      }
      result({ kind: "not_found" }, null);
  });
};


module.exports = UserImage;
