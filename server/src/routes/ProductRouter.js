const {Router} = require("express");
const { getTeamNBAJersey, getNbaPlayerJersey, getAllProducts,getAllProductsDescriptions} = require('../controllers/productController')

const productRouter = Router();

productRouter.get("/league/:leagueName",getAllProducts)
productRouter.get("/jerseys/team/:teamName",getTeamNBAJersey);
productRouter.get("/jerseys/player/:playerName",getNbaPlayerJersey)
productRouter.get("/all/:value",getAllProductsDescriptions);

module.exports = productRouter;