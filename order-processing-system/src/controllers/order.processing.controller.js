const orderProcessingService = require(
    "../services/order.processing.service"
);

const processOrder = async (req, res, next) => {

    try {

        const requestId = Date.now();

        console.time(`API REQUEST ${requestId}`);

        const result = await orderProcessingService.processOrder(
            req.body,
            requestId
        );

        console.timeEnd(`API REQUEST ${requestId}`);

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
};

module.exports = {
    processOrder
};