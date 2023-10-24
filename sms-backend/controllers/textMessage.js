"use strict";
const { TextMessage } = require("../models");

// get information from the routes, and parse it
const CreateTextMessage = async(req, res) => {
    console.log(`Logging request: ${req.body}`+JSON.stringify(req.body));

    await TextMessage.create({
        message: req.body.message,
        dataSent: req.body.dataSent,
        customerId: req.body.customerId,
    });

    res.status(200).send("Successfully saved.");
};

module.exports = CreateTextMessage;