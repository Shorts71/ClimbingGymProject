const { Router } = require("express");
const createCustomerRules = require("./middlewares/create-customers-rules");
const updateCustomerRules = require("./middlewares/update-customers-rules");

const CustomerModel = require("./customers-model");

const customersRoute = Router();

customersRoute.get("/customers", async (req, res) => {
    console.log("GET /customers called");
    const allCustomers = await CustomerModel.find();
    if (!allCustomers) {
        res.json([]);
    }
    else {
        console.log("All customers found.");
        res.status(200).json(allCustomers);
    }
});

customersRoute.get("/customers/:id", async (req, res) => {
    const customerID = req.params.id;
    const foundCustomer = await CustomerModel.findById(customerID);
    if (!foundCustomer) {
        return res.status(404).send(`Customer with ID ${customerID} does not exist.`);
    }
    else {
        console.log("Customer found.");
        res.status(200).json(foundCustomer);
    }
});

customersRoute.post("/customers", createCustomerRules, async (req, res) => {
    const addedCustomer = await CustomerModel.create({
        name: "Tyler Ly",
        email: "tylerly385@gmail.com",
        phone: "123-456-7890"
    });
    if (!addedCustomer) {
        return res.status(500).send(`Oops! Customer couldn't be added!`);
    }
    console.log("Customer added.");
    res.status(201).json(addedCustomer);
});

customersRoute.put("/customers/:id", updateCustomerRules, async (req, res) => {
    const customerID = req.params.id
    const foundCustomer = await CustomerModel.findById(customerID);
    if (!foundCustomer) {
        return res.status(404).send(`Customer with ID ${customerID} does not exist.`);
    }
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        customerID,
        { $set: { phone: '098-765-4321'} },
        { new: true }
    )
    if (!updatedCustomer) {
        return res.status(500).send(`Oops! Customer couldn't be updated!`);
    }
    console.log("Customer updated.");
    res.status(200).json(updatedCustomer);
});

customersRoute.delete("/customers/:id", async (req, res) => {
    const customerID = req.params.id;
    const foundCustomer = await CustomerModel.findById(customerID);
    if (!foundCustomer) {
        return res.status(404).send(`Customer with ID ${customerID} does not exist.`);
    }
    const deletedCustomer = await CustomerModel.findByIdAndDelete(customerID);
    if (!deletedCustomer) {
        return res.status(500).send('Oops! Customer could not be deleted!');
    }
    console.log("Customer deleted.");
    res.status(200).json(deletedCustomer);
});

module.exports = { customersRoute };
