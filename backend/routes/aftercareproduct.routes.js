module.exports = (app) => {
  const aftercareProducts = require("../controllers/aftercareproduct.controller");
  const router = require("express").Router();

  router.post("/", aftercareProducts.createAftercareProduct);
  router.get("/", aftercareProducts.getAllAftercareProducts);
  router.get("/:id", aftercareProducts.getAftercareProductById);
  router.get("/studio/:id", aftercareProducts.getAftercareProductByStudioId);
  router.put("/:id", aftercareProducts.updateAftercareProductById);
  router.delete("/:id", aftercareProducts.deleteAftercareProductById);

  app.use("/api/aftercareProducts", router);
};
