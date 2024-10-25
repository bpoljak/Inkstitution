const AftercareProduct = require("../models/aftercareproduct.model");

exports.createAftercareProduct = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const aftercareProduct = new AftercareProduct({
        aftercareProductName: req.body.aftercareProductName,
        aftercareProductDescription: req.body.aftercareProductDescription,
        aftercareProductPrice: req.body.aftercareProductPrice,
        aftercareProductImage: req.body.aftercareProductImage,
    });

    AftercareProduct.createAftercareProduct(aftercareProduct, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the AftercareProduct."
        });
      else res.send(data);
    });
};

exports.getAllAftercareProducts = (req, res) => {
    AftercareProduct.getAllAftercareProducts((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving all AftercareProducts."
        });
      else res.send(data);
    });
};

exports.getAftercareProductById = (req, res) => {
    AftercareProduct.getAftercareProductById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found AftercareProduct with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving AftercareProduct with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.getAftercareProductByStudioId = (req, res) => {
    AftercareProduct.getAllAftercareProductsByStudioId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found AftercareProduct with Studio id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving AftercareProduct with Studio id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

exports.updateAftercareProductById = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    AftercareProduct.updateAftercareProductById(
      req.params.id,
      req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found AftercareProduct with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating AftercareProduct with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
};

exports.deleteAftercareProductById = (req, res) => {
    AftercareProduct.deleteAftercareProductById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found AftercareProduct with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete AftercareProduct with id " + req.params.id
          });
        }
      } else res.send({ message: `AftercareProduct was deleted successfully!` });
    });
};
