const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const userroute = require("./routes/users");
const cors = require("cors")

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());// DB Config
var db = 'mongodb://localhost/shopkart';
mongoose
    .connect(
        db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());// Passport config
require("./config/passport")(passport);// Routes
app.use("/api/users", userroute);

const port = 5000

app.listen(port, function () {
    console.log("Server running on port: " + port);
});