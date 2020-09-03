var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Order = require("./Order.model")
var db = 'mongodb://localhost/shopkart';
// var db = "mongodb+srv://database-admin:admin123@cluster0.nntjh.gcp.mongodb.net/shopkart?retryWrites=true&w=majority"
var cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var jsonParser = bodyParser.json();


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Order API",
        description: "Order API Information",
        contact: {
          name: "SK"
        },
        servers: ["http://localhost:5002"]
      }
    },
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
 * /addorder:
 *  post:
 *    description: add a order
 *    parameters:
 *      - name: Order
 *        in: query
 *        description: order object 
 *        required: true
 *        schema:
 *          type: json
 *          format: json
 *    responses:
 *      '200':
 *        description: Successfully added order
 */
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
/**
 * @swagger
 * /getorders/:id:
 *  get:
 *    description: get an order
 *    parameters:
 *      - name: id
 *        in: query
 *        description: order id 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully returned order
 */
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


app.listen(5002, () => { console.log("product microservice started at localhost:5002") });