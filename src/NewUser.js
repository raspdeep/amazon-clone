import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./NewUser.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "@firebase/firestore";
import { useStateValue } from "./StateProvider";

function NewUser() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Register new user email
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        //successfully created a new user with email and password
        //console.log(auth);
        if (auth) {
          dispatch({
            type: "SET_USER",
            user: {
              name: name,
              phone: phone,
              address: address,
              postal: postal,
              email: email,
            },
          });
          // update newuser to Cloud Firestore

          try {
            setDoc(doc(db, "users", email, "personal", "details"), {
              name: name,
              phone: phone,
              address: address,
              postal: postal,
              email: email,
            });
            console.log("New user written to cloud");
          } catch (e) {
            console.error("Error adding document: ", e.message);
          }
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="newuser">
      {/* This is the login */}
      <Link to="/">
        <img
          className="newuser__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="newuser__container">
        <h1>New Account</h1>
        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h5>Phone</h5>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h5>Address</h5>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h5>Postal</h5>
          <input
            type="text"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="newuser__signInButton"
            type="submit"
            onClick={register}
          >
            Register
          </button>
        </form>
        <p>
          By signing-up you agree to AMAZON FAKE CLONE Condiditons of Use &
          Sale. Please see our Privacy Notice, ourCookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </div>
  );
}

export default NewUser;
