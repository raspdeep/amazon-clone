import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    //generate the special stripe secret which allows us to charge
    // a customer
    const total = getBasketTotal(basket);
    if (total) {
      const getClientSecret = async () => {
        const response = await axios({
          method: "post",
          // stripe expects the total in a currencies subunits
          // from $ change to cents
          url: `/payments/create?total=${total * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      };
      getClientSecret();
      // console.log("THE SECRET IS >>>", clientSecret);
    }
  }, [basket]);

  const handleSubmit = async (e) => {
    //use stripe to handle payment
    e.preventDefault();
    setProcessing(true);

    if (clientSecret) {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then((result) => {
          // db.collection("users")
          //   .doc(user?.uid)
          //   .collection("orders")
          //   .doc(paymentIntent.id)
          //   .set({
          //     basket: basket,
          //     amount: paymentIntent.amount,
          //     created: paymentIntent.created,
          //   });

          //result.paymentIntent = payment confirmation
          if (result.error) {
            console.log("Error in transaction: ", result.error.message);
          } else {
            // no error, payment confirmed
            // update Cloud Firestore
            try {
              setDoc(
                doc(
                  db,
                  "users",
                  user?.email,
                  "orders",
                  result.paymentIntent.id
                ),
                {
                  basket: basket,
                  amount: result.paymentIntent.amount,
                  address: user?.address,
                  created: result.paymentIntent.created,
                }
              );
              console.log("Document written to cloud");
            } catch (e) {
              console.error("Error adding document: ", e);
            }

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
              type: "EMPTY_BASKET",
            });
            history.replace("/orders");
          }
        });
    } else {
      alert("Please add item(s) in your Shopping basket!");
    }

    setProcessing(false);
  };

  const handleChange = (e) => {
    //Listen for changes in the CardElement
    // and display any errors
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
    setProcessing(false);
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address:</h3>
          </div>
          <div className="payment__address">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.address}</p>
            <p>{user?.postal}</p>
          </div>
        </div>
        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* Products in your basket */}
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will be here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>
                      Order Total:
                      <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
