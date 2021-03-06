import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    async componentDidMount() {
        const { data } = await Axios.get("http://localhost:5001/api/products");
        this.setState({
            products: data
        })
    }

    render() {
        return (
            <div>
                <main className="main">
                    <div className="content">
                        <ul className="products">
                            {
                                this.state.products.map(product =>
                                    <li key={product._id}>
                                        <div className="product">
                                            <img className="product-image" src={product.image} alt="product" />
                                            <div className="product-name">
                                                <Link to={'/product/'+product._id} >{product.name}</Link>
                                            </div>
                                            <div className="product-brand">{product.desc.split(',')[0]}</div>
                                            <div className="product-price">₹{product.price}</div>
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