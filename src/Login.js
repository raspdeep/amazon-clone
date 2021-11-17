import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Sign in for existing user
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        history.push("/");
      })
      .catch((error) =>
        alert(
          "Login in failed! Please check your email / password.",
          error.message
        )
      );
  };
  //Register new user email
  const register = (e) => {
    // e.preventDefault();

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((auth) => {
    //     //successfully created a new user with email and password
    //     //console.log(auth);
    //     if (auth) {
    //       history.push("/");
    //     }
    //   })
    //   .catch((error) => alert(error.message));
    history.push("/newuser");
  };
  return (
    <div className="login">
      {/* This is the login */}
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
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
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to AMAZON FAKE CLONE Condiditons of Use &
          Sale. Please see our Privacy Notice, ourCookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <div className="login__dividerbreak"></div>
        <button
          className="login__registerButton"
          onClick={register}
          type="submit"
        >
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
