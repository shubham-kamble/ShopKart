var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");
var validateRegisterInput = require("../validation/register");
var validateLoginInput = require("../validation/login");
var User = require("../models/User");

/**
 * @swagger
 * /users/register:
 *  post:
 *    description: register a user
 *    parameters:
 *      - name: User
 *        in: query
 *        description: user object 
 *        required: true
 *        schema:
 *          type: json
 *          format: json
 *    responses:
 *      '200':
 *        description: Successfully registered user
 *      '400':
 *        description: User already exists
 */
router.post("/register", (req, res) => {
    var { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    } User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ msg: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: login user
 *    parameters:
 *      - name: User
 *        in: query
 *        description: user object 
 *        required: true
 *        schema:
 *          type: json
 *          format: json
 *    responses:
 *      '200':
 *        description: Successfully returned user token
 *      '400':
 *        description: invalid password
 *      '404':
 *        description: invalid email
 */
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 //1 year
                    },
                    (err, token) => {
                        res.json({
                            userid: user.id,
                            token: user.role + ',' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ msg: "Password incorrect" });
            }
        });
    });
});


module.exports = router;