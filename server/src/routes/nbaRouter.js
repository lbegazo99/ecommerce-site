const {Router} = require("express");
const { getTeamNBAJersey, getNbaPlayerJersey, getAllProducts,getAllProductsDescriptions} = require('../controllers/nbaController')

const nbaRouter = Router();

nbaRouter.get("/league/:leagueName",getAllProducts)
nbaRouter.get("/jerseys/team/:teamName",getTeamNBAJersey);
nbaRouter.get("/jerseys/player/:playerName",getNbaPlayerJersey)
nbaRouter.get("/all/:value",getAllProductsDescriptions);

module.exports = nbaRouter;