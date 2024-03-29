require("dotenv").config();
const express = require("express");
const app = express();
let port = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "https://wall2wallproductions.herokuapp.com",
  })
);
app.use(express.static("public"));

const stripe = require("stripe")(process.env.SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 30000, name: "Basic" }],
  [2, { priceInCents: 50000, name: "Pro" }],
  [3, { priceInCents: 100000, name: "Studio" }],
]);

app.get("/", function (req, res) {
  // ejs render automatically looks in the views folder
  res.render("index");
});

app.get("/success", function (req, res) {
  // ejs render automatically looks in the views folder
  res.render("success");
});

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
      success_url: `https://wall2wallproductions.herokuapp.com/success`,
      cancel_url: `https://wall2wallproductions.herokuapp.com`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
