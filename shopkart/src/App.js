import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import './App.css';
import Route from 'react-router-dom/Route';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/NavBar';
import store from "./store";
import Product from './components/Product';
import Categories from './components/Categories';
import Cart from './components/Cart';
import Orders from './components/Orders';

// const Route = require("react-router-dom").Route;

class App extends Component {

  // componentDidMount(){
  //   localStorage.setItem("jwtToken","asdasd");
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/products/" component={Categories} />
            <Route path="/cart/:id?" component={Cart} />
            <Route exact path="/myorder/" component={Orders} />
          </div>
        </Router>
        <footer>©1998-2020 ShopKart </footer>
      </Provider>
    );
  }
}

export default App;