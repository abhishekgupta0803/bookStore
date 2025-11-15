
const express = require("express");
const  bookController = require("../controllers/bookControllers")
const router = express.Router();

router.get("/",bookController);


module.exports =  router;
