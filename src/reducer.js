export const initialState = {
  basket: [],
  user: {
    name: "",
    phone: "",
    address: "",
    postal: "",
    email: "",
  },
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "DELETE_FROM_BASKET":
      // return the first index of item that matches in case multiple items of same ID
      // so it does not delete all the items of the same ID
      const index = state.basket.findIndex(
        (basketIndex) => basketIndex.id === action.id
      );
      let newBasket = [...state.basket]; //use spread function to create a copy
      if (index >= 0) {
        newBasket.splice(index, 1); //cut away at index location by 1
      } else {
        console.warn(
          `Cannot remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    // case "SET_USER_EMAIL":
    //   return {
    //     ...state,
    //     user: { ...state.user, email: action.email },
    //   };
    // case "SET_USER_NAME":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       name: action.name,
    //       address: action.address,
    //       postal: action.postal,
    //       phone: action.phone,
    //       email: action.email,
    //     },
    //   };
    default:
      return state;
  }
};

export default reducer;
