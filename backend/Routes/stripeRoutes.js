const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Product = require("../Models/Product");
const Offer = require("../Models/Offer");

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { items } = req.body;

//     // 1️⃣ Fetch products from DB
//     let subtotal = 0;
//     const line_items = [];

//     for (const item of items) {
//       const product = await Product.findById(item.productId);

//       if (!product) continue;

//       const productTotal = product.price * item.quantity;
//       subtotal += productTotal;

//       line_items.push({
//         price_data: {
//           currency: "inr",
//           product_data: { name: product.name },
//           unit_amount: product.price * 100,
//         },
//         quantity: item.quantity,
//       });
//     }

//     // 2️⃣ Apply Offers
//     const now = new Date();
//     const activeOffers = await Offer.find({
//       validFrom: { $lte: now },
//       validUntil: { $gte: now },
//     });

//     let discountAmount = 0;

//     for (const offer of activeOffers) {
//       for (const item of items) {
//         if (offer.products.includes(item.productId)) {
//           const product = await Product.findById(item.productId);

//           const itemTotal = product.price * item.quantity;

//           if (offer.percentageDiscount) {
//             discountAmount +=
//               (itemTotal * offer.percentageDiscount) / 100;
//           }

//           if (offer.discountValue) {
//             discountAmount += offer.discountValue * item.quantity;
//           }
//         }
//       }
//     }

//     const totalAmount = subtotal - discountAmount;

//     // 3️⃣ Create Stripe session using FINAL TOTAL
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items,
//       success_url: `${import.meta.env.FRONTEND}/checkout-success`,
      
//       cancel_url: `${import.meta.env.FRONTEND}/checkout-cancel`,
//       metadata: {
//         subtotal,
//         discountAmount,
//         totalAmount,
//       },
//     });

//     res.json({ url: session.url });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    let subtotal = 0;
    let discountAmount = 0;
    const line_items = [];

    // 1️⃣ Fetch products
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

    // 2️⃣ Apply Offers
    const now = new Date();

    const activeOffers = await Offer.find({
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    });

    for (const offer of activeOffers) {
      for (const item of items) {
        if (offer.products.includes(item.productId)) {
          const product = await Product.findById(item.productId);
          const itemTotal = product.price * item.quantity;

          if (offer.percentageDiscount) {
            discountAmount +=
              (itemTotal * offer.percentageDiscount) / 100;
          }

          if (offer.discountValue) {
            discountAmount += offer.discountValue * item.quantity;
          }
        }
      }
    }

    const totalAmount = subtotal - discountAmount;

    // 3️⃣ Add discount as negative line item
    if (discountAmount > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Discount" },
          unit_amount: -Math.round(discountAmount * 100),
        },
        quantity: 1,
      });
    }

    // 4️⃣ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.FRONTEND_URL}/checkout-success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
      metadata: {
        subtotal,
        discountAmount,
        totalAmount,
      },
    });

    res.json({ url: session.url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;