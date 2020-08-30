import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import cartReducers from "./cartReducers";
import productListReducer from "./productReducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    productList: productListReducer,
    cart: cartReducers
});