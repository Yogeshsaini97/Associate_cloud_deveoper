const orderService = require("../services/order.service");

const getOrders = (req, res) => {

    const orders = orderService.getAllOrders();

    res.status(200).json(orders);
};

const getOrder = (req, res) => {

    const id = Number(req.params.id);

    const order = orderService.getOrderById(id);

    res.status(200).json(order);
};

const createOrder = (req, res) => {

    const order = orderService.createOrder(req.body);

    res.status(201).json(order);
};

const updateOrder = (req, res) => {

    const id = Number(req.params.id);

    const order = orderService.updateOrder(
        id,
        req.body
    );

    res.status(200).json(order);
};

const deleteOrder = (req, res) => {

    const id = Number(req.params.id);

    orderService.deleteOrder(id);

    res.status(204).send();
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};