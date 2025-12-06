// Project

require("dotenv").config();
console.log("Loaded DB_URL =", process.env.DB_URL);
const express = require("express");
const connectDB = require("./shared/middlewares/connect-db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.use(cors({ origin: "http://localhost:5173", }));

const { productsRoute } = require("./modules/products/products-routes");
const { usersRoute } = require("./modules/users/users-routes");
const { membershipsRoute } = require("./modules/memberships/memberships-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(connectDB);

app.use(productsRoute);
app.use(usersRoute);
app.use(membershipsRoute);

app.use((error, req, res, next) => {
  console.log(error);
  if (res.headersSent) {
    return;
  }
  res.status(500).send("Oops! Internal Server Error!");
});

app.use((req, res, next) => {
  res.status(404).send(`Error 404: ${req.method} ${req.path} not found.`);
});

app.listen(port, hostname, (error) => {
  if (error) console.log(error.message);
  else console.log(`Server running at http://${hostname}:${port}`);
});
