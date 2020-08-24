import React, { Component } from "react";
import { NavLink, BrowserRouter as Route } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <ul>
                    <li>
                        <NavLink to="/" exact activeStyle={
                            { color: 'green' }
                        }>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/category" exact activeStyle={
                            { color: 'green' }
                        }>Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mycart" exact activeStyle={
                            { color: 'green' }
                        }>My Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" exact activeStyle={
                            { color: 'green' }
                        }>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" exact activeStyle={
                            { color: 'green' }
                        }>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" exact activeStyle={
                            { color: 'green' }
                        }>Login</NavLink>
                    </li>
                </ul>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome Home</h1>);
                    }
                } />
                <Route path="/about" exact strict render={
                    () => {
                        return (<h1>Welcome to About</h1>);
                    }
                } />
                <Route path="/category" exact strict render={
                    () => {
                        return (<h1>Welcome to categories</h1>);
                    }
                } />
                <Route path="/mycart" exact strict render={
                    () => {
                        return (<h1>Welcome to your cart</h1>);
                    }
                } />
                <Route path="/profile" exact strict render={
                    () => {
                        return (<h1>Welcome to Profile</h1>);
                    }
                } />
            </div>
        );
    }
} export default Navbar;