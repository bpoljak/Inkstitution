const AftercareProduct = require("../models/aftercareproduct.model");

exports.createAftercareProduct = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const aftercareProduct = {
    aftercareProductName: req.body.aftercareProductName,
    aftercareProductDescription: req.body.aftercareProductDescription,
    aftercareProductPrice: req.body.aftercareProductPrice,
    aftercareProductImage: req.body.aftercareProductImage,
  };

  try {
    const data = await AftercareProduct.createAftercareProduct(
      aftercareProduct
    );
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while creating the AftercareProduct.",
    });
  }
};

exports.getAllAftercareProducts = async (req, res) => {
  try {
    const data = await AftercareProduct.getAllAftercareProducts();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving all AftercareProducts.",
    });
  }
};

exports.getAftercareProductById = async (req, res) => {
  try {
    const data = await AftercareProduct.getAftercareProductById(req.params.id);
    if (!data) {
      res.status(404).send({
        message: `Not found AftercareProduct with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving AftercareProduct with id ${req.params.id}.`,
    });
  }
};

exports.getAftercareProductByStudioId = async (req, res) => {
  try {
    const data = await AftercareProduct.getAllAftercareProductsByStudioId(
      req.params.id
    );
    if (!data.length) {
      res.status(404).send({
        message: `Not found AftercareProducts for Studio with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving AftercareProducts for Studio with id ${req.params.id}.`,
    });
  }
};

exports.updateAftercareProductById = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    const data = await AftercareProduct.updateAftercareProductById(
      req.params.id,
      req.body
    );
    if (!data) {
      res.status(404).send({
        message: `Not found AftercareProduct with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error updating AftercareProduct with id ${req.params.id}.`,
    });
  }
};

exports.deleteAftercareProductById = async (req, res) => {
  try {
    const data = await AftercareProduct.deleteAftercareProductById(
      req.params.id
    );
    if (!data) {
      res.status(404).send({
        message: `Not found AftercareProduct with id ${req.params.id}.`,
      });
    } else {
      res.send({ message: `AftercareProduct was deleted successfully!` });
    }
  } catch (error) {
    res.status(500).send({
      message: `Could not delete AftercareProduct with id ${req.params.id}.`,
    });
  }
};
