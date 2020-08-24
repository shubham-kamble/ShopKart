import React, { Component} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products :[]
        };
      }
    
      async componentDidMount() {
        const {data} =await Axios.get("http://localhost:5001/api/products");
        console.log(data);
        this.setState({
            products:data
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
                                            <div className="product-brand">{product.brand}</div>
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