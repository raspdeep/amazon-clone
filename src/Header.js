import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header({ setSearchInput }) {
  const [{ basket, user }] = useStateValue();
  const history = useHistory();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleSearch = (e) => {
    const userInput = document.getElementById("header__searchInput").value;
    //if (e.type === "click") console.log(e.target.value);
    if (e.key === "Enter" || e.type === "click" || e.type === "input") {
      if (e.target.value !== "") {
        setSearchInput(userInput);
        history.push("/search");
      }
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg1.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input
          className="header__searchInput"
          id="header__searchInput"
          type="text"
          placeholder="Search..."
          onKeyDown={handleSearch}
          //onInput={handleSearch}
        />
        <SearchIcon
          className="header__searchIcon"
          onClick={(e) => {
            e.preventDefault();
            handleSearch(e);
          }}
        />
      </div>
      <div className="header__nav">
        {/* <Link to={!user && "/login"}> */}
        <Link to={!user ? "/login" : ""}>
          <div onClick={handleAuth} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.name}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartOutlined fontSize="large" />
            <span className="header__optionLineTwo header__backetCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
