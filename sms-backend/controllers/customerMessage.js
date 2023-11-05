"use strict";
const twilio = require('twilio');
require('dotenv').config();
const { CustomerMessage } = require("../models");

// get information from the routes, and parse it
// response for creating a message, and sending a text via Twilio
const CreateCustomerMessage = async(req, res) => {
    console.log(`Logging request: ${req.body}`+JSON.stringify(req.body));

    if (!req.body.firstName || !req.body.lastName || !req.body.phoneNumber || !req.body.message) {
        return res.status(400).send("Missing fields.");
    }

    // store Twilio account SID and authentication token from .env
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    console.log("SECRET KEYS:::::", accountSid);

    // store Twilio credentials
    const client = new twilio(accountSid, authToken);

    await CustomerMessage.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber, 
        message: req.body.message,
        sent: "Success.",
    });

    // create message; specify message, receiver, and sender
    client.messages.create({
        body: req.body.message,
        to: req.body.phoneNumber,
        from: "+18443293900",
    })
    .catch((error) => {
        console.log({error});
    });

    return res.status(200).send("Successfully saved, and sent.");
};

const getCustomerMessages = async (req, res) => {
    // find all customer messages
    const response = await CustomerMessage.findAll();

    // return customer messages stored in response
    return res.status(200).send(response);
};

module.exports = {
    CreateCustomerMessage,
    getCustomerMessages,
};
