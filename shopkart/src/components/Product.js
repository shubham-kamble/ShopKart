import React from 'react';
import products from './ProductsList';

function Product(props){

    var prod = products.products.find(x=> x._id === props.match.params.id);

    return <div>
        <h1>{prod.name}</h1>
    </div>
}

export default Product;