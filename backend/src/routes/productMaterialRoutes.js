const router = require("express").Router();
const c = require("../controllers/productMaterialController");

router.post("/", c.create);
router.get("/", c.list);
router.delete("/:id", c.remove);


module.exports = router;