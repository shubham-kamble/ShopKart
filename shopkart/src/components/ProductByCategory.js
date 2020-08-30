import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ProductByCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search:"",
            products: []
        };
        console.log("State " + this.props.selectedCategory);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        const { data } = await Axios.get("http://localhost:5001/api/categories/" + this.props.selectedCategory);
        console.log(data);
        this.setState({
            products: data
        })
    }

    async componentWillReceiveProps(nextProps) {
        const { data } = await Axios.get("http://localhost:5001/api/categories/" + nextProps.selectedCategory);
        console.log(data);
        this.setState({
            products: data
        });
    }

    async handleChange(event) {
        this.setState({ sort: event.target.value });
        this.sortData(event.target.value);
    }

    handleSearch(event){
        this.setState({ search: event.target.value });
    }

    async search(){
        const { data } = await Axios.get("http://localhost:5001/api/searchproduct/" + this.state.search);
        console.log(data);
        this.setState({
            products: data
        });
    }

    sortData(sort) {
        if (sort === 'lowtohigh') {
            console.log("sorting....")
            this.setState({
                products: this.state.products.sort((a, b) => a.price - b.price)
            });
            console.log(this.state.products);
        } else if (sort === 'hightolow') {
            console.log("sorting....")
            this.setState({
                products: this.state.products.sort((b, a) => a.price - b.price)
            });
            console.log(this.state.products);
        }
    }

    render() {
        return (
            <div>
                <main className="main">
                    <div className="operationBar">
                    <input placeholder="Search.." value={this.state.search} onChange={this.handleSearch}/><button type="submit" onClick={this.search}><i class="fa fa-search"></i></button>
                        Sort by Price: <select value={this.state.sort} onChange={this.handleChange}>
                            <option selected disabled hidden></option>
                            <option value="lowtohigh">Low to High</option>
                            <option value="hightolow">High to Low</option>
                        </select>
                    </div>
                    <div className="content">
                        <ul className="products">
                            {
                                this.state.products.map(product =>
                                    <li key={product._id}>
                                        <div className="product">
                                            <img className="product-image" src={product.image} alt="product" />
                                            <div className="product-name">
                                                <Link to={'/product/' + product._id} >{product.name}</Link>
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

export default ProductByCategory;