const AppError = require("../errors/AppError");
const orderRepository = require("../repositories/order.repository");

const getAllOrders = () => {
    return orderRepository.findAll();
};

const getOrderById = (id) => {
    const order = orderRepository.findById(id);

    if (!order) {
        throw new AppError("Order not found",404);
    }

    return order;
};

const createOrder = (orderData) => {

    const {
        customerId,
        productId,
        quantity
    } = orderData;

    if (!customerId || !productId || !quantity) {
        throw new AppError(
            "customerId, productId and quantity are required",400
        );
    }

    if (quantity <= 0) {
        throw new AppError("Quantity must be greater than zero",400);
    }

    const order = {
        id: Date.now(),
        customerId,
        productId,
        quantity,
        status: "CREATED",
        createdAt: new Date().toISOString()
    };

    return orderRepository.create(order);
};

const updateOrder = (id, data) => {
    const order = orderRepository.update(id, data);

    if (!order) {
        throw new AppError("Order not found",404);
    }

    return order;
};

const deleteOrder = (id) => {
    const deleted = orderRepository.remove(id);

    if (!deleted) {
        throw new AppError("Order not found",404);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};