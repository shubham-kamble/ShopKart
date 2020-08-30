import React, { Component } from "react";
import logo from '../images/1shopkart_logo.png';
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            userLoggedIn: "",
            logUrl: ""
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        console.log(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken') === null) {
            this.setState({
                userLoggedIn: "Login",
                logUrl: "/login"
            });
        } else {
            this.setState({
                userLoggedIn: "Logout",
                logUrl: "/"
            })
        }
    }

    logOut() {
        if (this.state.userLoggedIn === "Logout") {
            console.log("needs to logout");
            this.props.logoutUser();
            // localStorage.removeItem("jwtToken");
            window.location.reload(true);
        }
    }

    render() {
        if(localStorage.getItem('jwtToken') === null){
            return (
                <div className="navbar-fixed">
                    <ul>
                        <li className="logo"><NavLink to="/" exact><img className="logoimg" src={logo} alt="Logo" /></NavLink></li>
                        <li><NavLink to="/products" exact>Categories</NavLink></li>
                        <li><NavLink to="/cart">My Cart</NavLink></li>
                        <li className="floatRight"><NavLink to={this.state.logUrl} exact onClick={this.logOut}>{this.state.userLoggedIn}</NavLink></li>
                        {/* <li className="floatRight" onClick={this.logManage}>{this.state.userLoggedIn}</li> */}
                    </ul>
                </div>
            );
        }
        else{
            return (
                <div className="navbar-fixed">
                    <ul>
                        <li className="logo"><NavLink to="/" exact><img className="logoimg" src={logo} alt="Logo" /></NavLink></li>
                        <li><NavLink to="/products" exact>Categories</NavLink></li>
                        <li><NavLink to="/cart">My Cart</NavLink></li>
                        <li className="floatRight"><NavLink to={this.state.logUrl} exact onClick={this.logOut}>{this.state.userLoggedIn}</NavLink></li>
                        {/* <li className="floatRight" onClick={this.logManage}>{this.state.userLoggedIn}</li> */}
                        <li className="floatRight"><NavLink to="/myorders" exact>My Order</NavLink></li>
                    </ul>
                </div>
            );
        }
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

// export default Navbar;