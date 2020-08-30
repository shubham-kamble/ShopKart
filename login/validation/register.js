var Validator = require("validator");

var isEmpty = require("is-empty"); module.exports = function validateRegisterInput(data) {

    let errors = {};// Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.msg = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.msg = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.msg = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.msg = "Password field is required";
    } if (Validator.isEmpty(data.password2)) {
        errors.msg = "Confirm password field is required";
    } if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.msg = "Password must be at least 6 characters";
    } if (!Validator.equals(data.password, data.password2)) {
        errors.msg = "Passwords must match";
    } return {
        errors,
        isValid: isEmpty(errors)
    };
};