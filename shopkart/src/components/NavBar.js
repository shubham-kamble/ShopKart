import React, { Component } from "react";
import logo from '../images/1shopkart_logo.png';
import { NavLink} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <ul>
                    <li className="logo"><NavLink to="/" exact><img className="logoimg" src={logo} alt="Logo" /></NavLink></li>
                    <li><NavLink to="/category" exact>Categories</NavLink></li>
                    <li><NavLink to="/mycart" exact>My Cart</NavLink></li>
                    <li className="floatRight"><NavLink to="/login" exact>Login</NavLink></li>
                    <li className="floatRight"><NavLink to="/profile" exact>My Profile</NavLink></li>
                </ul>
            </div>
        );
    }
} export default Navbar;