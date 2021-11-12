import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/610aFo74RdL._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="234352345"
            title="The Lean Startup"
            price={29.99}
            image="https://m.media-amazon.com/images/I/81SrwYY-6-L._AC_UY218_.jpg"
            rating={4}
          />
          <Product
            id="113652345"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.99}
            image="https://m.media-amazon.com/images/I/617EZ-pt8JL._AC_UY218_.jpg"
            rating={3}
          />
        </div>
        <div className="home__row">
          <Product
            id="23413666"
            title="Oculus Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB"
            price={299.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/615YaAiA-ML._AC_UY218_.jpg"
          />
          <Product
            id="23413888"
            title="2020 Apple iPad Air (10.9-inch, Wi-Fi, 64GB) - Green (4th Generation)"
            price={899.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/71wm6xK34sL._AC_UY218_.jpg"
          />
          <Product
            id="23413999"
            title="Razer BlackShark V2 X Gaming Headset: 7.1 Surround Sound - 50mm Drivers - Memory Foam Cushion - for PC, PS4, PS5, Switch, Xbox One, Xbox Series X|S, Mobile - 3.5mm Audio Jack - Black"
            price={99.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/71waplSVO7L._AC_UY218_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="234132432"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monster - Super Ultra Wide Dual WQHD 5120 X 1440"
            price={1094.98}
            rating={4}
            image="https://m.media-amazon.com/images/I/71916r38cNL._AC_UY218_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
