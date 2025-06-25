const {Router} = require("express");
const { getTeamNBAJersey, getNbaPlayerJersey, getAllProducts,getAllProductsDescriptions,getProduct} = require('../controllers/productController')

const productRouter = Router();

productRouter.get("/league/:leagueName",getAllProducts)
productRouter.get("/jerseys/team/:teamName",getTeamNBAJersey);
productRouter.get("/jerseys/player/:playerName",getNbaPlayerJersey)
productRouter.get("/all/:value",getAllProductsDescriptions);
productRouter.get("/:productId",getProduct);



module.exports = productRouter;