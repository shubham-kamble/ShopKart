import React, { Component } from 'react';
import Axios from "axios";
import ProductByCategory from './ProductByCategory';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory:"all",
            categories: []
        };
    }

    async componentDidMount() {
        const { data } = await Axios.get("http://localhost:5001/api/categories");
        console.log(data);
        this.setState({
            categories: data
        })
    }

    changeCategory(value) {
        console.log(this.state.selectedCategory);
        this.setState({ selectedCategory : value} );
     }

    render() {
        return (
            <div >
                <div className="row">
                    <ul className="col-2">
                        <li onClick={e => this.changeCategory("all")}>All Products</li>
                        {
                            this.state.categories.map((category,index) =>
                                <li key={index} style={{ textTransform: 'capitalize' }}
                                onClick={e => this.changeCategory(category)}>
                                    {category}
                                </li>)
                        }
                    </ul>
                    <div className="col-10">
                        <ProductByCategory selectedCategory={this.state.selectedCategory}></ProductByCategory>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;