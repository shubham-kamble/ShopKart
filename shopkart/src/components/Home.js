import React, { Component } from "react";
import products from './Products';

class Home extends Component {
    render() {
        return (
            <div>
                <main className="main">
                    <div className="content">
                        <ul className="products">
                            {
                                products.products.map(product =>
                                    <li>
                                        <div className="product">
                                            <img className="product-image" src={product.image} alt="product" />
                                            <div className="product-name">
                                                <a href="product.html">{product.name}</a>
                                            </div>
                                            <div className="product-brand">{product.brand}</div>
                                            <div className="product-price">${product.price}</div>
                                        </div>
                                    </li>)
                            }
                        </ul>
                    </div>
                </main>
            </div>
        );
    }
} 

export default Home;