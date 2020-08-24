import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to mainpage when they login
    }if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault(); 
    var userData = {
      email: this.state.email,
      password: this.state.password
    }; 
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    console.log(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login-container">
        <div>
          <div className="login-inner">
            <div className="login-head" >
              <h4>
                <b>Login</b> below
              </h4>
            </div>

            <form onSubmit={this.onSubmit}>
              <div className="input-field">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="lr-btn">
                <button type="submit">Login</button>
              </div>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <Link to="/" className="back2home">Back to home</Link>
          </div>
        </div>
      </div>
    );
  }
} 

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ loginUser })(Login);