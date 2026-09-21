const AppError = require("../errors/AppError");
const orderRepository = require("../repositories/order.repository");

const getAllOrders = async () => {
    return await orderRepository.findAll();
};

const getOrderById = async (id) => {
    const order = await orderRepository.findById(id);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    return order;
};

const createOrder = async (orderData) => {

    const {
        customerId,
        productId,
        quantity
    } = orderData;

    if (!customerId || !productId || !quantity) {
        throw new AppError(
            "customerId, productId and quantity are required",
            400
        );
    }

    if (quantity <= 0) {
        throw new AppError(
            "Quantity must be greater than zero",
            400
        );
    }

    const order = {
        customerId,
        productId,
        quantity,
        status: "CREATED"
    };

    return await orderRepository.create(order);
};

const updateOrder = async (id, data) => {

    const order = await orderRepository.update(id, data);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    return order;
};

const deleteOrder = async (id) => {

    const deleted = await orderRepository.remove(id);

    if (!deleted) {
        throw new AppError("Order not found", 404);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};