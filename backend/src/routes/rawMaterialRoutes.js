const router = require("express").Router();
const c = require("../controllers/rawMaterialController");

router.post("/", c.create);
router.get("/", c.list);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;