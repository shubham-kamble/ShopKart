var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Order = require("./Order.model")
var db = 'mongodb://localhost/shopkart';
var cors = require("cors")
var jsonParser = bodyParser.json();

app.use(cors());
mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.post("/api/addorder", jsonParser, async function (req, res) {
    console.log(req.body);

    if (req.body.user === null || req.body.user === undefined) {
        res.status(400).send({ msg: "Please Login" });
    }
    else {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            user: req.body.user,
            totalPrice: req.body.totalPrice,
            orderedDate: Date.now()
        });
        const newOrderCreated = await newOrder.save();
        res.status(201).send({ msg: "New Order Created", data: newOrderCreated });
    }
});

app.get('/api/getorders/:id', function (req, res) {
    console.log('getting all orders by userid');
    Order.find({
        user: req.params.id
    }).exec(function (err, orders) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(orders);
            res.json(orders);
        }
    });
});


app.listen(5002, () => { console.log("product microservice started at localhost:5001") });