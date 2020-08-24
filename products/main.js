import products from "./ProductsList";
import express from "express";
const cors = require("cors")

var app = express();
app.use(cors());

app.get('/api/products',function(req,res){
    res.send(products.products);
});

app.listen(5001, ()=>{console.log("product microservice started at localhost:5001")});