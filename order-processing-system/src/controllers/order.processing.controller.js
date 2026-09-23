const orderProcessingService = require(
    "../services/order.processing.service"
);

const {
    colorRequestId
} = require("../utils/requestColor");

let requestCounter = 0;

const processOrder = async (req, res, next) => {

    const requestNumber = ++requestCounter;
    const requestId = `REQUEST_${requestNumber}`;

    const coloredRequestId =
        colorRequestId(requestId, requestNumber);

    try {

        console.log(`${coloredRequestId} API REQUEST STARTED`);

        console.time(`API REQUEST ${requestId}`);

        const result =
            await orderProcessingService.processOrder(
                req.body,
                requestId,
                requestNumber
            );

        console.timeEnd(`API REQUEST ${requestId}`);

        console.log(
            `${coloredRequestId} API REQUEST COMPLETED`
        );

        res.status(200).json(result);

    } catch (error) {

        console.error(
            `${coloredRequestId} API REQUEST FAILED`
        );

        next(error);
    }
};

module.exports = {
    processOrder
};