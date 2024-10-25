const sql = require("../config/db.config");

const AftercareProduct = function(aftercareProduct) {
    this.aftercareProductId = aftercareProduct.aftercareProductId;
    this.aftercareProductName = aftercareProduct.aftercareProductName;
    this.aftercareProductDescription = aftercareProduct.aftercareProductDescription;
    this.aftercareProductPrice = aftercareProduct.aftercareProductPrice;
    this.aftercareProductImage = aftercareProduct.aftercareProductImage;
};

AftercareProduct.createAftercareProduct = (newAftercareProduct, result) => {
    const createAftercareProductQuery = `
      INSERT INTO AftercareProducts (AftercareProductName, AftercareProductDescription, AftercareProductPrice, AftercareProductImage) 
      VALUES (?, ?, ?, ?)`;

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

AftercareProduct.getAllAftercareProducts = (result) => {
    const getAllAftercareProductsQuery = "SELECT * FROM AftercareProducts";

    sql.query(getAllAftercareProductsQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("AftercareProducts: ", res);
      result(null, res);
    });
};

AftercareProduct.getAftercareProductById = (id, result) => {
    const getAftercareProductByIdQuery = `SELECT * FROM AftercareProducts WHERE AftercareProductID = ?`;
    
    sql.query(getAftercareProductByIdQuery, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found aftercareproduct: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
};

AftercareProduct.getAllAftercareProductsByStudioId = (id, result) => {
    const getAllAftercareProductsByStudioIdQuery = `SELECT * FROM AftercareProducts WHERE StudioID = ?`;
    
    sql.query(getAllAftercareProductsByStudioIdQuery, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found aftercareproducts: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
};

AftercareProduct.updateAftercareProductById = (id, aftercareProduct, result) => {
    const updateAftercareProductQuery = `
      UPDATE AftercareProducts
      SET AftercareProductName = ?, AftercareProductDescription = ?, AftercareProductPrice = ?, AftercareProductImage = ?
      WHERE AftercareProductID = ?`;

    sql.query(
      updateAftercareProductQuery,
      [
        aftercareProduct.aftercareProductName,
        aftercareProduct.aftercareProductDescription,
        aftercareProduct.aftercareProductPrice,
        aftercareProduct.aftercareProductImage,
        id
      ],
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

        console.log("updated aftercareproduct: ", { id: id, ...aftercareProduct });
        result(null, { id: id, ...aftercareProduct });
      }
    );
};

AftercareProduct.deleteAftercareProductById = (id, result) => {
    sql.query("DELETE FROM AftercareProducts WHERE AftercareProductID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted aftercareproduct with id: ", id);
      result(null, res);
    });
};

module.exports = AftercareProduct;
