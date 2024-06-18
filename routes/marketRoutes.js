const express = require("express");
const router = express.Router();

const {
  getAllPublishedProducts 
  
} = require("../controllers/marketController");


router.get ("/", getAllPublishedProducts); //display all the product listings belonging to this user



module.exports = router;