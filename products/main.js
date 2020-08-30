
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./Product.model")
var db = 'mongodb://localhost/shopkart';
var cors = require("cors")

app.use(cors());
mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.get('/api/products', function (req, res) {
    console.log('getting all products');
    Product.find({}).exec(function (err, products) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(products);
            res.json(products);
        }
    });
});

app.get('/api/products/:id', function (req, res) {
    console.log('getting one product');
    Product.find({
        _id: req.params.id
    }).exec(function (err, product) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(product);
            res.json(product);
        }
    });
});

app.get('/api/categories', function (req, res) {
    console.log('getting all categories');
    Product.find({}).distinct('category', function (err, categories) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(categories);
            res.json(categories);
        }
    });
});

app.get('/api/categories/:category', function (req, res) {
    console.log('getting product by categories');
    if (req.params.category == "all") {
        console.log('getting all products');
        Product.find({}).exec(function (err, products) {
            if (err) {
                res.send('Error occured!');
            } else {
                console.log(products);
                res.json(products);
            }
        });
    }
    else {
        Product.find({
            category: req.params.category
        }).exec(function (err, products) {
            if (err) {
                res.send('Error occured!');
            } else {
                console.log(products);
                res.json(products);
            }
        });
    }

});

app.get('/api/searchproduct/:keyword', function (req, res) {
    console.log('searching a product'+req.params.keyword);
    // Product.find({ desc: { $regex: req.params.keyword , $options: "i" } }, function (err, products) {
    // $or: [ {vehicleDescription : { $regex: search.keyWord, $options: 'i' }}, { adDescription: { $regex: search.keyWord, $options: 'i' } } ]
        Product.find({ $or: [ {name : { $regex: req.params.keyword, $options: 'i' }}, { desc: { $regex: req.params.keyword, $options: 'i' } } ] }, function (err, products) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(products);
            res.json(products);
        }
    });
});


app.listen(5001, () => { console.log("product microservice started at localhost:5001") });