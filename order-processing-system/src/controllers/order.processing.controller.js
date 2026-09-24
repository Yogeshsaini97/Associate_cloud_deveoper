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
        // STEP 1 - Validate request
        // --------------------------------

        console.log(`[${requestId}] STEP 1: Validating order...`);

        const {
            customerId,
            productId,
            quantity
        } = req.body;

        if (!customerId || !productId || !quantity) {

            console.log(
                `[${requestId}] VALIDATION FAILED`
            );

            return res.status(400).json({
                message: "customerId, productId and quantity are required"
            });
        }

        if (quantity <= 0) {

            console.log(
                `[${requestId}] VALIDATION FAILED: Invalid quantity`
            );

            return res.status(400).json({
                message: "Quantity must be greater than zero"
            });
        }

        console.log(
            `[${requestId}] STEP 1: Validation successful`
        );

        // --------------------------------
        // STEP 2 - Create SQS message
        // --------------------------------

        console.log(
            `[${requestId}] STEP 2: Creating SQS message...`
        );

        const message = {
            customerId,
            productId,
            quantity
        };

        console.log(
            `[${requestId}] SQS message created:`,
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
            `[${requestId}] STEP 3: SQS accepted the message`
        );

        // --------------------------------
        // STEP 4 - Send HTTP response
        // --------------------------------

        console.log(
            `[${requestId}] STEP 4: Sending 202 response to client`
        );

        res.status(202).json({
            message: "Order accepted for processing",
            status: "PROCESSING",
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