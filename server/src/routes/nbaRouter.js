const {Router} = require("express");
const { getTeamNBAJersey, getNbaPlayerJersey } = require('../controllers/nbaController')

const nbaRouter = Router();

nbaRouter.get("/jerseys/team/:teamName",getTeamNBAJersey);
nbaRouter.get("/jerseys/player/:playerName",getNbaPlayerJersey)

module.exports = nbaRouter;