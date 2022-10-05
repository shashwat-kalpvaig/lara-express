const router = require("express").Router();
require('dotenv').config();

router.get("/", (req,res) => {
	res.send("Project <strong>"+process.env.APP_NAME + "</strong> is Ready !");
});

module.exports = router