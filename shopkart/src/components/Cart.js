import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const quantity = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  return <div className="cart row">
    <div className="cart-list col-9">
      <ul className="cart-list-container">
        {cartItems.length === 0 ?
            <div className="emptyCart">No Items Present in the Cart</div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>
                      {item.desc}
                  </div>
                  <div>
                    Quantity:
                    <input value={item.quantity} className="quantity" type="number" min={1} max={5} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}/>
                    <button type="button" className="btn btn-danger" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                ₹{item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action col-3">
      <h3>
        Total
        :
        ₹ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
      </h3>
      <button disabled={cartItems.length === 0}>
        Buy Now
      </button>

    </div>

  </div>
}

export default Cart;