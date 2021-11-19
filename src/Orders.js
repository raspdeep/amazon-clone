import "./Orders.css";

import Order from "./Order";

function Orders({ orders }) {
  // useEffect(() => {
  //   if (user?.email) {
  //     const q = query(
  //       collection(db, "users", user?.email, "orders"),
  //       orderBy("created", "desc")
  //     );
  //     onSnapshot(q, (snapshot) =>
  //       setOrders(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  //   } else {
  //     setOrders([]);
  //   }
  //   //console.log(orders);
  // }, [user, dispatch]);
  window.scrollTo(0, 0);
  return (
    <div className="orders">
      <h1>Your Orders:</h1>
      <div className="orders__order">
        {orders?.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
