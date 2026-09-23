const express = require("express");

const orderProcessingController = require(
    "../controllers/order.processing.controller"
);

const router = express.Router();

router.post(
    "/process",
    orderProcessingController.processOrder
);

module.exports = router;