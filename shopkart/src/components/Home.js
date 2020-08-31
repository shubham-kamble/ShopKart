import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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
        // return (
        //     <div className="carousel-container">
        //         <section className="carousel" aria-label="Gallery">
        //             <ol className="carousel__viewport">
        //                 <li id="carousel__slide1"
        //                     tabindex="0"
        //                     className="carousel__slide">
        //                     <div className="carousel__snapper">
        //                         <a href="#carousel__slide4"
        //                             className="carousel__prev">Go to last slide</a>
        //                         <a href="#carousel__slide2"
        //                             className="carousel__next">Go to next slide</a>
        //                     </div>
        //                 </li>
        //                 <li id="carousel__slide2"
        //                     tabindex="0"
        //                     className="carousel__slide">
        //                     <div className="carousel__snapper"></div>
        //                     <a href="#carousel__slide1"
        //                         className="carousel__prev">Go to previous slide</a>
        //                     <a href="#carousel__slide3"
        //                         className="carousel__next">Go to next slide</a>
        //                 </li>
        //                 <li id="carousel__slide3"
        //                     tabindex="0"
        //                     className="carousel__slide">
        //                     <div className="carousel__snapper"></div>
        //                     <a href="#carousel__slide2"
        //                         className="carousel__prev">Go to previous slide</a>
        //                     <a href="#carousel__slide4"
        //                         className="carousel__next">Go to next slide</a>
        //                 </li>
        //                 <li id="carousel__slide4"
        //                     tabindex="0"
        //                     className="carousel__slide">
        //                     <div className="carousel__snapper"></div>
        //                     <a href="#carousel__slide3"
        //                         className="carousel__prev">Go to previous slide</a>
        //                     <a href="#carousel__slide1"
        //                         className="carousel__next">Go to first slide</a>
        //                 </li>
        //             </ol>
        //             <aside className="carousel__navigation">
        //                 <ol className="carousel__navigation-list">
        //                     <li className="carousel__navigation-item">
        //                         <a href="#carousel__slide1"
        //                             className="carousel__navigation-button">Go to slide 1</a>
        //                     </li>
        //                     <li className="carousel__navigation-item">
        //                         <a href="#carousel__slide2"
        //                             className="carousel__navigation-button">Go to slide 2</a>
        //                     </li>
        //                     <li className="carousel__navigation-item">
        //                         <a href="#carousel__slide3"
        //                             className="carousel__navigation-button">Go to slide 3</a>
        //                     </li>
        //                     <li className="carousel__navigation-item">
        //                         <a href="#carousel__slide4"
        //                             className="carousel__navigation-button">Go to slide 4</a>
        //                     </li>
        //                 </ol>
        //             </aside>
        //         </section>
        //     </div>
        // );
    }
}

export default Home;