"use strict";
const { Customers } = require("../models");

// get information from the routes, and parse it
const CreateCustomer = async(req, res) => {
    console.log(`Logging request: ${req.body}`+JSON.stringify(req.body));

    await Customers.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    });

    res.status(200).send("Successfully saved.");
};

module.exports = CreateCustomer;