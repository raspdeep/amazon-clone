import React, { useEffect, useState } from "react";
import Product from "./Product";
import "./Search.css";

function Search({ searchInput, products }) {
  const [numOfSearch, setNumOfSearch] = useState(0);
  let counter = 0;

  useEffect(() => {
    setNumOfSearch(counter);
  }, [searchInput, counter]);

  const renderSearch = () => {
    return (
      <div className="search__list">
        <h2>
          {numOfSearch} result{numOfSearch > 1 ? "s" : ""} for: "{searchInput}"
        </h2>
        {products
          .filter((item) =>
            item.data.title
              .toLowerCase()
              .includes(searchInput.toString().toLowerCase())
          )
          .map((item, index) => {
            counter++;
            return (
              <Product
                key={index}
                id={item.id}
                image={item.data.image}
                title={item.data.title}
                price={item.data.price}
                rating={item.data.rating}
              />
            );
          })}
      </div>
    );
  };
  window.scrollTo(0, 0);
  return <div className="search">{renderSearch()}</div>;
}

export default Search;
