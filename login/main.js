const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const userroute = require("./routes/users");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors")

app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Login API",
      description: "Login API Information",
      contact: {
        name: "SK"
      },
      servers: ["http://localhost:5000"]
    }
  },
  apis: ["./routes/users.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());// DB Config
var db = 'mongodb://localhost/shopkart';
//  var db = "mongodb+srv://database-admin:admin123@cluster0.nntjh.gcp.mongodb.net/shopkart?retryWrites=true&w=majority"
mongoose
  .connect(
    db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
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