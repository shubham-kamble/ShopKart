var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./Product.model")
// var db = 'mongodb://localhost/shopkart';
let config = require('config');
// var db = "mongodb+srv://database-admin:admin123@cluster0.nntjh.gcp.mongodb.net/shopkart?retryWrites=true&w=majority"
var cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Admin API",
            description: "Admin API Information",
            contact: {
                name: "SK"
            },
            servers: ["http://localhost:5003"]
        }
    },
    apis: ["main.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
var jsonParser = bodyParser.json();

app.use(cors());
mongoose
    .connect(
        config.DBHost, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

/**
 * @swagger
 * /addproduct:
 *  post:
 *    description: add a product
 *    parameters:
 *      - name: Product
 *        in: query
 *        description: product object 
 *        required: true
 *        schema:
 *          type: json
 *          format: json
 *    responses:
 *      '200':
 *        description: Successfully added product
 */
app.post('/api/addproduct', jsonParser, async function (req, res) {
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
/**
 * @swagger
 * /deleteproduct/:id:
 *  delete:
 *    description: delete a product
 *    parameters:
 *      - name: id
 *        in: query
 *        description: product id
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully deleted product
 */
app.delete('/api/deleteproduct/:id', function (req, res) {
    console.log('deleting one product');
    Product.findByIdAndDelete(req.params.id, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
        res.json({ msg: "deleted successfully" });
    });
});
/**
 * @swagger
 * /updateproduct/:id:
 *  put:
 *    description: updates a product
 *    parameters:
 *      - name: id
 *        in: query
 *        description: product id
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: updated product
 *        in: query
 *        description: product object
 *        required: true
 *        schema:
 *          type: json
 *          format: json
 *    responses:
 *      '202':
 *        description: Successfully updated product
 */
app.put('/api/updateproduct/:id', jsonParser, async function (req, res) {
    console.log('updating a product');
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id,
        {
            $set: {
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category
            }
        }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("updated");
                res.status(202).send({ msg: "Updated Successfully" });
            }
        });
    // const newProdCreated = await newProduct.save();
    // res.status(201).send({ msg: "New Order Created", data: newProdCreated });
});


app.listen(5003, () => { console.log("product microservice started at localhost:5003") });

module.exports = app;