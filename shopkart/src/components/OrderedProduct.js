import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function OrderedProduct(props) {

    var [product, setProduct] = useState([]);

    useEffect(() => {
        var fetchProd = async () => {
            var { data } = await Axios.get("http://localhost:5001/api/products/" + props.id);
            setProduct(data[0]);
        }   
        fetchProd();
    }, [props.id]);

    return <div>{product.name}</div>
}

export default OrderedProduct;