
const router = require("express").Router();

router.get("/", (req,res) => {
	res.json({msg:"Share JSON data : Make Restful API"});
});

module.exports = router;  