const Offer = require("../Models/OfferModal");

// CREATE OFFER
exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL OFFERS (ADMIN)
exports.getAllOffers = async (req, res) => {
  const offers = await Offer.find().populate("products");
  res.json(offers);
};

// GET ACTIVE OFFERS (FRONTEND)
exports.getActiveOffers = async (req, res) => {
  const now = new Date();

  const offers = await Offer.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).populate("products");

  res.json(offers);
};

// DELETE OFFER
exports.deleteOffer = async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: "Offer Deleted" });
};
