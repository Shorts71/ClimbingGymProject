// Project

require("dotenv").config();
const express = require("express");
const hostname = "127.0.0.1";
const port = 3000;

const app = express();

const { productsRoute } = require("./modules/products/products-routes");
const { customersRoute } = require("./modules/customers/customers-routes");
const { membershipsRoute } = require("./modules/memberships/memberships-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRoute);
app.use(customersRoute);
app.use(membershipsRoute);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send("Oops! Internal Server Error!");
})

app.use((req, res, next) => {
    res.status(404).send(`Error 404: ${req.method} ${req.path} not found.`);
});

app.listen(port, hostname, (error) => {
    if (error) console.log(error.message);
    else console.log(`Server running at http://${hostname}:${port}`);
});