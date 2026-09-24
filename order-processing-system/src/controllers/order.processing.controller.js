const orderService = require("../services/order.service");
const sqsService = require("../services/sqs.service");

let requestCounter = 0;

const processOrder = async (req, res, next) => {

    const requestId = `REQUEST_${++requestCounter}`;

    try {

        console.log("==============================================");
        console.log(`[${requestId}] ORDER REQUEST RECEIVED`);
        console.log("==============================================");

        console.log(
            `[${requestId}] Request body:`,
            JSON.stringify(req.body)
        );

        // --------------------------------
        // STEP 1 - Validate + create order
        // --------------------------------

        console.log(
            `[${requestId}] STEP 1: Creating order in RDS...`
        );

        const order = await orderService.createOrder(req.body);

        console.log(
            `[${requestId}] Order created`
        );

        console.log(
            `[${requestId}] Order ID: ${order.id}`
        );

        // --------------------------------
        // STEP 2 - Create SQS message
        // --------------------------------

        const message = {
            orderId: order.id
        };

        console.log(
            `[${requestId}] STEP 2: SQS message:`,
            JSON.stringify(message)
        );

        // --------------------------------
        // STEP 3 - Send to SQS
        // --------------------------------

        console.log(
            `[${requestId}] STEP 3: Sending order to SQS...`
        );

        const response = await sqsService.sendMessage(
            message,
            requestId
        );

        console.log(
            `[${requestId}] STEP 3: SQS accepted message`
        );

        console.log(
            `[${requestId}] SQS Message ID: ${response.MessageId}`
        );

        // --------------------------------
        // STEP 4 - Respond to client
        // --------------------------------

        console.log(
            `[${requestId}] STEP 4: Sending 202 response`
        );

        res.status(202).json({
            orderId: order.id,
            status: "PROCESSING",
            message: "Order accepted for processing",
            messageId: response.MessageId
        });

        console.log(
            `[${requestId}] ORDER REQUEST COMPLETED`
        );

        console.log("==============================================");

    } catch (error) {

        console.error(
            `[${requestId}] ORDER REQUEST FAILED`
        );

        console.error(
            `[${requestId}] Error:`,
            error.message
        );

        next(error);
    }
};

module.exports = {
    processOrder
};