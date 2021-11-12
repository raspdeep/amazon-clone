import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Payment from "./Payment";
import Orders from "./Orders";
import Checkout from "./Checkout";
import Login from "./Login";
import NewUser from "./NewUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from "./firebase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// publishable key
const promise = loadStripe(
  "pk_test_51JtQsiL3L2mhbNW3vmQBzkQtsMaNFIES7fTZKucD3e4aN39vrsD8BvFf7UDOEI9t51Ry8sKMnbdLbl3CGYMPIz6800VdsoT3w2"
);

function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [currentUser, setCurrentUser] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has login
        const qDetails = query(
          collection(db, "users", authUser.email, "personal")
        );
        onSnapshot(qDetails, (snapshot) =>
          setCurrentUser(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        const qOrders = query(
          collection(db, "users", authUser.email, "orders"),
          orderBy("created", "desc")
        );
        onSnapshot(qOrders, (snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        //console.log("Query>>");
        // dispatch({
        //   type: "SET_USER_NAME",
        //   email: authUser.email,
        // });
      } else {
        // user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setOrders([]);
        setCurrentUser([]);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser[0]) {
      dispatch({
        type: "SET_USER",
        user: {
          name: currentUser[0].data.name,
          address: currentUser[0].data.address,
          postal: currentUser[0].data.postal,
          phone: currentUser[0].data.phone,
          email: currentUser[0].data.email,
        },
      });
    }
  }, [currentUser, dispatch]);

  return (
    //BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders orders={orders} />
          </Route>
          <Route path="/newuser">
            <NewUser />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
