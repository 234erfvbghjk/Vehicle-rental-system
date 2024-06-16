// post
const express = require("express");
const router = express.Router();
const BorrowController = require("../../controllers/api/BorrowApiController");

router.post("/:id", BorrowController.create);
router.put("/:id", BorrowController.update);
module.exports = router;

