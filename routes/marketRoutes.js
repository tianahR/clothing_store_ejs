const express = require("express");
const router = express.Router();

const {
  getAllPublishedProducts,
  addBuyer,
} = require("../controllers/marketController");

router.get("/", getAllPublishedProducts); //display all the product listings belonging to this user
router.post("/update/:id", addBuyer); //update a particular entry

module.exports = router;
