const sql = require("./db.js");

const AftercareProduct = function(aftercareProduct) {
    this.aftercareProductId = aftercareProduct.aftercareProductId;
    this.aftercareProductName = aftercareProduct.aftercareProductName;
    this.aftercareProductDescription = aftercareProduct.aftercareProductDescription;
    this.aftercareProductPrice = aftercareProduct.aftercareProductPrice;
    this.aftercareProductImage = aftercareProduct.aftercareProductImage
};