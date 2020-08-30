import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types";

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("http://localhost:5001/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data[0]._id,
        name: data[0].name,
        image: data[0].image,
        price: data[0].price,
        desc:data[0].desc,
        quantity
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {

  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart,removeFromCart } 