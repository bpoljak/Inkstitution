const knex = require("../config/db.config");

const AftercareProduct = function (aftercareProduct) {
  this.aftercareProductId = aftercareProduct.aftercareProductId;
  this.aftercareProductName = aftercareProduct.aftercareProductName;
  this.aftercareProductDescription =
    aftercareProduct.aftercareProductDescription;
  this.aftercareProductPrice = aftercareProduct.aftercareProductPrice;
  this.aftercareProductImage = aftercareProduct.aftercareProductImage;
};

AftercareProduct.createAftercareProduct = async (
  newAftercareProduct,
  result
) => {
  try {
    const [id] = await knex("AftercareProducts").insert({
      AftercareProductName: newAftercareProduct.aftercareProductName,
      AftercareProductDescription:
        newAftercareProduct.aftercareProductDescription,
      AftercareProductPrice: newAftercareProduct.aftercareProductPrice,
      AftercareProductImage: newAftercareProduct.aftercareProductImage,
    });

    console.log("Created aftercare product: ", { id, ...newAftercareProduct });
    result(null, { id, ...newAftercareProduct });
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

AftercareProduct.getAllAftercareProducts = async (result) => {
  try {
    const products = await knex("AftercareProducts").select("*");
    console.log("AftercareProducts: ", products);
    result(null, products);
  } catch (err) {
    console.error("Error: ", err);
    result(null, err);
  }
};

AftercareProduct.getAftercareProductById = async (id, result) => {
  try {
    const product = await knex("AftercareProducts")
      .where({ AftercareProductID: id })
      .first();
    if (product) {
      console.log("Found aftercare product: ", product);
      result(null, product);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

AftercareProduct.getAllAftercareProductsByStudioId = async (id, result) => {
  try {
    const products = await knex("AftercareProducts").where({ StudioID: id });
    if (products.length) {
      console.log("Found aftercare products: ", products);
      result(null, products);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

AftercareProduct.updateAftercareProductById = async (
  id,
  aftercareProduct,
  result
) => {
  try {
    const updatedRows = await knex("AftercareProducts")
      .where({ AftercareProductID: id })
      .update({
        AftercareProductName: aftercareProduct.aftercareProductName,
        AftercareProductDescription:
          aftercareProduct.aftercareProductDescription,
        AftercareProductPrice: aftercareProduct.aftercareProductPrice,
        AftercareProductImage: aftercareProduct.aftercareProductImage,
      });

    if (updatedRows) {
      console.log("Updated aftercare product: ", { id, ...aftercareProduct });
      result(null, { id, ...aftercareProduct });
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

AftercareProduct.deleteAftercareProductById = async (id, result) => {
  try {
    const deletedRows = await knex("AftercareProducts")
      .where({ AftercareProductID: id })
      .del();
    if (deletedRows) {
      console.log("Deleted aftercare product with id: ", id);
      result(null, deletedRows);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.error("Error: ", err);
    result(err, null);
  }
};

module.exports = AftercareProduct;
