const express = require("express");
const bookController = require("../controllers/bookControllers");
const router = express.Router();

router.get("/", bookController.getBook);
router.get("/:id", bookController.getBookById);
router.post("/:bookId/check-access", bookController.checkBookAccess);
router.post("/:bookId/content", bookController.getBookContent);
router.get("/:id/content", bookController.getBookContent); // Alternative route format
router.post("/grant-access", bookController.grantBookAccess);

module.exports = router;
