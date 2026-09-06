const express = require("express");

const orderController = require("../controllers/order.controller");

const router = express.Router();

router.get("/", orderController.getOrders);

router.get("/:id", orderController.getOrder);

router.post("/", orderController.createOrder);

router.patch("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;