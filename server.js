require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "wall2wallproductions.netlify.app",
  })
);
app.use(express.static("public"));

const stripe = require("stripe")(process.env.SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 30000, name: "Basic" }],
  [2, { priceInCents: 50000, name: "Pro" }],
  [3, { priceInCents: 100000, name: "Studio" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.PUBLIC_URL}/success.html`,
      cancel_url: `${process.env.PUBLIC_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000);
