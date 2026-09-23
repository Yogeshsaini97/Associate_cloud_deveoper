const orderProcessingService = require(
    "../services/order.processing.service"
);

let requestCounter = 0;

const processOrder = async (req, res, next) => {

    const requestId = `REQUEST_${++requestCounter}`;

    try {

        console.log(`[${requestId}] API REQUEST STARTED`);

        console.time(`API REQUEST ${requestId}`);

        const result = await orderProcessingService.processOrder(
            req.body,
            requestId
        );

        console.timeEnd(`API REQUEST ${requestId}`);

        console.log(`[${requestId}] API REQUEST COMPLETED`);

        res.status(200).json(result);

    } catch (error) {

        console.error(`[${requestId}] API REQUEST FAILED`);

        next(error);

    }
};

module.exports = {
    processOrder
};