import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    } 
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }; 
        console.log(newUser);
        this.props.registerUser(newUser, this.props.history); 
    }; 
    
    render() {
        const { errors } = this.state; return (
            <div className="login-container">
                <div>
                    <div className="register-inner ">
                        <div className="login-head">
                            <h4><b>Register</b> below</h4>
                        </div>
                        
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
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
                            <div className="input-field">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div className="lr-btn">
                                <button type="submit"> Sign up </button>
                            </div>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                            <Link to="/" className="btn-flat waves-effect">Back to home</Link>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
} 

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));