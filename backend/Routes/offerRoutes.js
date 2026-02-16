const express = require("express");
const router = express.Router();
const offerController = require("../Controllers/OfferController");

router.post("/", offerController.createOffer);
router.get("/", offerController.getAllOffers);
router.get("/active", offerController.getActiveOffers);
router.delete("/:id", offerController.deleteOffer);

module.exports = router;
