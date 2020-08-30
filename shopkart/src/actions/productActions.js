import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
  } from './types';
  import axios from 'axios';

  const listProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get('http://localhost:5001/api/products');
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
  
  
  const productActions = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get('/api/products/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };
  
  
  export { productActions, listProducts }
  