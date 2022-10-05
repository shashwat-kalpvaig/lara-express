const router = require("express").Router();
const HomeController = require("../../app/http/controllers/HomeController");
require('dotenv').config();

router.get("/", HomeController.index);

module.exports = router;