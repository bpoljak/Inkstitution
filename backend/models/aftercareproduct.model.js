const knex = require("../config/db.config");

const AftercareProduct = function (aftercareProduct) {
  this.aftercareProductId = aftercareProduct.aftercareProductId;
  this.aftercareProductName = aftercareProduct.aftercareProductName;
  this.aftercareProductDescription = aftercareProduct.aftercareProductDescription;
  this.aftercareProductPrice = aftercareProduct.aftercareProductPrice;
  this.aftercareProductImage = aftercareProduct.aftercareProductImage;
};

AftercareProduct.createAftercareProduct = async (newAftercareProduct) => {
  try {
    const [id] = await knex("AftercareProducts").insert({
      AftercareProductName: newAftercareProduct.aftercareProductName,
      AftercareProductDescription: newAftercareProduct.aftercareProductDescription,
      AftercareProductPrice: newAftercareProduct.aftercareProductPrice,
      AftercareProductImage: newAftercareProduct.aftercareProductImage,
    });

    return { id, ...newAftercareProduct };
  } catch (err) {
    throw new Error(err.message || "Error creating the aftercare product.");
  }
};

AftercareProduct.getAllAftercareProducts = async () => {
  try {
    const products = await knex("AftercareProducts").select("*");
    return products;
  } catch (err) {
    throw new Error(err.message || "Error retrieving aftercare products.");
  }
};

AftercareProduct.getAftercareProductById = async (id) => {
  try {
    const product = await knex("AftercareProducts").where({ AftercareProductID: id }).first();
    if (!product) {
      throw new Error(`Aftercare product with ID ${id} not found.`);
    }
    return product;
  } catch (err) {
    throw new Error(err.message || `Error retrieving aftercare product with ID ${id}.`);
  }
};

AftercareProduct.getAllAftercareProductsByStudioId = async (studioId) => {
  try {
    const products = await knex("AftercareProducts").where({ StudioID: studioId });
    if (!products.length) {
      throw new Error(`No aftercare products found for Studio ID ${studioId}.`);
    }
    return products;
  } catch (err) {
    throw new Error(err.message || `Error retrieving aftercare products for Studio ID ${studioId}.`);
  }
};

AftercareProduct.updateAftercareProductById = async (id, aftercareProduct) => {
  try {
    const updatedRows = await knex("AftercareProducts")
      .where({ AftercareProductID: id })
      .update({
        AftercareProductName: aftercareProduct.aftercareProductName,
        AftercareProductDescription: aftercareProduct.aftercareProductDescription,
        AftercareProductPrice: aftercareProduct.aftercareProductPrice,
        AftercareProductImage: aftercareProduct.aftercareProductImage,
      });

    if (!updatedRows) {
      throw new Error(`Aftercare product with ID ${id} not found.`);
    }
    return { id, ...aftercareProduct };
  } catch (err) {
    throw new Error(err.message || `Error updating aftercare product with ID ${id}.`);
  }
};

AftercareProduct.deleteAftercareProductById = async (id) => {
  try {
    const deletedRows = await knex("AftercareProducts").where({ AftercareProductID: id }).del();
    if (!deletedRows) {
      throw new Error(`Aftercare product with ID ${id} not found.`);
    }
    return { message: `Aftercare product with ID ${id} was successfully deleted.` };
  } catch (err) {
    throw new Error(err.message || `Error deleting aftercare product with ID ${id}.`);
  }
};

module.exports = AftercareProduct;
