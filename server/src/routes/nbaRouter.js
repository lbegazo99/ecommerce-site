const{Router} = require("express");
const{getAllNBATeams} = require('../controllers/nbaController')

const nbaRouter = Router();

nbaRouter.get("/teams",getAllNBATeams);

module.exports = nbaRouter;