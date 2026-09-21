const orderService = require("../services/order.service");

const getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const order = await orderService.getOrderById(id);

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const order = await orderService.updateOrder(
            id,
            req.body
        );

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        await orderService.deleteOrder(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};