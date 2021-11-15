import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }] = useStateValue();
  return (
    <div className="checkout">
      {/* Left side */}
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Launches/ILM/Fuji_ILM_Ship_en_US._CB665226464_.png"
          alt=""
        />
        <div>
          <h3>Hello, {user?.name}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
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

      {/* Right side */}
      <div className="checkout__right">
        <Subtotal basket={basket} />
      </div>
    </div>
  );
}

export default Checkout;
