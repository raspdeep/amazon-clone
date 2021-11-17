import React from "react";
import "./Home.css";
import Product from "./Product";

function Home({ products }) {
  const renderProduct1 = (products, start, end) => {
    const newProduct = [];

    products.forEach((item, index) => {
      if (index >= start && index <= end)
        newProduct.push(
          <Product
            key={index}
            id={item.id}
            title={item.data.title}
            price={item.data.price}
            image={item.data.image}
            rating={item.data.rating}
          />
        );
    });
    return newProduct;
  };
  const renderProduct = (item, index) => (
    <Product
      key={index}
      id={item.id}
      title={item.data.title}
      price={item.data.price}
      image={item.data.image}
      rating={item.data.rating}
    />
  );

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/610aFo74RdL._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          {renderProduct1(products, 0, 1)}
          {/* {products.map((item, index) => {
            if (index <= 1) return renderProduct(item, index);
            return "";
          })} */}
        </div>
        <div className="home__row">
          {renderProduct1(products, 2, 4)}
          {/* {products.map((item, index) => {
            if (index > 1 && index <= 4) return renderProduct(item, index);
            return "";
          })} */}
        </div>
        <div className="home__row">
          {renderProduct1(products, 5, 5)}
          {/* {products.map((item, index) => {
            if (index > 4) return renderProduct(item, index);
            return "";
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
