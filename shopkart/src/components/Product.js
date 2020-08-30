import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Product(props) {

    var [prod, setProd] = useState([]);
    var [quantity, setQuantity] = useState(1);
    var prodId = props.match.params.id;

    useEffect(() => {
        var fetchProd = async () => {
            var { data } = await Axios.get("http://localhost:5001/api/products/" + prodId);
            setProd(data[0]);
        }
        fetchProd();
    }, [prodId]);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?quantity=' + quantity);
    };

    const buyNow = async () => {
        if (localStorage.getItem('jwtToken') === null) {
            alert('Please Login to continue');
            props.history.push('/login/');
        }
        else {
            var order = {
                "orderItems": [prodId],
                "user": localStorage.getItem('userid'),
                "totalPrice": prod.price
            }
            console.log(order);
            if (window.confirm('Confirm')) {
                Axios.post("http://localhost:5002/api/addorder/", order).then(res => {
                    props.history.push('/myorders/');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }

    return <div>
        <div className="product-details">
            <img className="product-image product-details-image" src={prod.image} alt="product" />
            <div className="product-info">
                <div className="product-details-name">{prod.name}</div>
                <h5>Description:</h5>
                <div className="product-details-desc">{prod.desc}</div>
            </div>
            <div className="product-details-price">₹{prod.price}
                <input type="number" placeholder="Quantity"
                    value={quantity} min={1} max={5}
                    onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                <button onClick={handleAddToCart} style={{ backgroundColor: "#008CBA" }}>Add to Cart</button>
                <button onClick={buyNow} style={{ backgroundColor: "#4CAF50" }}>Buy Now</button>
            </div>
        </div>
    </div>
}

export default Product;