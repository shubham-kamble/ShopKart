var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./Product.model")
var db = 'mongodb://localhost/shopkart';
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// var db = "mongodb+srv://database-admin:admin123@cluster0.nntjh.gcp.mongodb.net/shopkart?retryWrites=true&w=majority"
var cors = require("cors")

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Product API",
        description: "Product API Information",
        contact: {
          name: "SK"
        },
        servers: ["http://localhost:5001"]
      }
    },
    // ['.routes/*.js']
    apis: ["main.js"]
  };


  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors());
mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
/**
 * @swagger
 * /products:
 *  get:
 *    description: Use to get all products
 *    responses:
 *      '200':
 *        description: successful response
 */
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
/**
 * @swagger
 * /latestproducts:
 *  get:
 *    description: Use to get latest 3 products
 *    responses:
 *      '200':
 *        description: successful response
 */
app.get('/api/latestproducts', function (req, res) {
    console.log('getting latest products');
    Product.find({}).sort({$natural:-1}).limit(3).exec(function (err, products) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(products);
            res.json(products);
        }
    });
});
/**
 * @swagger
 * /products/:id:
 *  get:
 *    description: Use to one products
 *    parameters:
 *      - name: id
 *        in: query
 *        description: id of product 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully found a product
 */
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
/**
 * @swagger
 * /categories:
 *  get:
 *    description: Use to get all categories
 *    responses:
 *      '200':
 *        description: successful response
 */
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
/**
 * @swagger
 * /categories/:category:
 *  get:
 *    description: Use to get products by category
 *    parameters:
 *      - name: category
 *        in: query
 *        description: search by category 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully found products
 */
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
/**
 * @swagger
 * /searchproduct/:keyword:
 *  get:
 *    description: Use to search product
 *    parameters:
 *      - name: keyword
 *        in: query
 *        description: search keyword 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully found a product
 */
app.get('/api/searchproduct/:keyword', function (req, res) {
    console.log('searching a product' + req.params.keyword);
    // Product.find({ desc: { $regex: req.params.keyword , $options: "i" } }, function (err, products) {
    // $or: [ {vehicleDescription : { $regex: search.keyWord, $options: 'i' }}, { adDescription: { $regex: search.keyWord, $options: 'i' } } ]
    Product.find({ $or: [{ name: { $regex: req.params.keyword, $options: 'i' } }, { desc: { $regex: req.params.keyword, $options: 'i' } }] }, function (err, products) {
        if (err) {
            res.send('Error occured!');
        } else {
            console.log(products);
            res.json(products);
        }
    });
});
/**
 * @swagger
 * /searchproducttext/:keyword:
 *    get:
 *      description: Use to search a product using full text search
 *    parameters:
 *      - name: keyword
 *        in: query
 *        description: search keyword 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully found a product
 */
app.get('/api/searchproduct2/:keyword', function (req, res) {
    console.log('searching a product' + req.params.keyword);
    // Product.find({ desc: { $regex: req.params.keyword , $options: "i" } }, function (err, products) {
    // $or: [ {vehicleDescription : { $regex: search.keyWord, $options: 'i' }}, { adDescription: { $regex: search.keyWord, $options: 'i' } } ]
    // Product.find({ $or: [ {name : { $regex: req.params.keyword, $options: 'i' }}, { desc: { $regex: req.params.keyword, $options: 'i' } } ] }, function (err, products) {
        Product.find({$text: {$search: req.params.keyword}}, function (err, products) {
            if (err) {
                res.send('Error occured!');
            } else {
                console.log(products);
                res.json(products);
            }
        });
    });


app.listen(5001, () => { console.log("product microservice started at localhost:5001") });