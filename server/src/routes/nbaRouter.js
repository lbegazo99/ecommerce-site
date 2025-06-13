const {Router} = require("express");
const { getTeamNBAJersey, getNbaPlayerJersey, getAllProducts } = require('../controllers/nbaController')

const nbaRouter = Router();

nbaRouter.get("/league/:leagueName",getAllProducts)
nbaRouter.get("/jerseys/team/:teamName",getTeamNBAJersey);
nbaRouter.get("/jerseys/player/:playerName",getNbaPlayerJersey)

module.exports = nbaRouter;