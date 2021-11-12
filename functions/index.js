const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JtQsiL3L2mhbNW3HN8lMUzfqvA6zjJz6ISrkIf4gO2Xu0TmgGElWK1waDaBl1hIWwC40S6mcvbXElpf3fchD1JJ005BhDCX3s"
);

//API

//- App config
const app = express();
// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  if (total != "0") {
    console.log("Payment request received BOOM! for this amount >>", total);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "sgd",
      });
      // OK - created
      response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  }
});
// - Listen command
exports.api = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-38c90/us-central1/api
