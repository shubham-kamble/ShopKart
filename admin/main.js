
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./Product.model")
var db = 'mongodb://localhost/shopkart';
var cors = require("cors");
var jsonParser = bodyParser.json();

app.use(cors());
mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.post('/api/addproduct',jsonParser, async function (req, res) {
    console.log('adding new product');
    const newProduct = new Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category
    });
    const newProdCreated = await newProduct.save();
    res.status(201).send({ msg: "New Order Created", data: newProdCreated });
});

app.delete('/api/deleteproduct/:id', function (req, res) {
    console.log('deleting one product');
    Product.findByIdAndDelete(req.params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        res.json({msg:"deleted successfully"});
      });
});

app.put('/api/updateproduct/:id',jsonParser, async function (req, res) {
    console.log('adding new product');
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id ,  
        {$set:{
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category
        }
        }, function (err) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            res.status(202).send({ msg: "Updated Successfully" });
        } 
    }); 
    // const newProdCreated = await newProduct.save();
    // res.status(201).send({ msg: "New Order Created", data: newProdCreated });
});


app.listen(5003, () => { console.log("product microservice started at localhost:5001") });