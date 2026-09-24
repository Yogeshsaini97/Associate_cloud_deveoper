const {
    SQSClient,
    ReceiveMessageCommand,
    DeleteMessageCommand
} = require("@aws-sdk/client-sqs");

const orderRepository = require("../repositories/order.repository");
const {
    sendOrderCompletedEmail
} = require("../services/email.service");

const sqsClient = new SQSClient({
    region: "ap-south-1"
});

const queueUrl =
    "https://sqs.ap-south-1.amazonaws.com/851435022215/order-processing-queue";


const processOrderMessage = async (message) => {

    const body = JSON.parse(message.Body);

    const orderId = body.orderId;

    console.log("==============================================");
    console.log(`[WORKER] Received order ${orderId}`);
    console.log("==============================================");

    // --------------------------------
    // STEP 1 - Get order from RDS
    // --------------------------------

    console.log(
        `[WORKER] Getting order ${orderId} from RDS...`
    );

    const order = await orderRepository.findById(orderId);

    if (!order) {
        throw new Error(
            `Order ${orderId} not found`
        );
    }

    console.log(
        `[WORKER] Order ${orderId} found`
    );

    // --------------------------------
    // STEP 2 - Process order
    // --------------------------------

    console.log(
        `[WORKER] Processing order ${orderId}...`
    );

    /*
       Our real business processing will go here.

       For now this is where we will eventually implement:

       - Inventory check
       - Payment
       - Order confirmation
       - Other business operations
    */

    console.log(
        `[WORKER] Order ${orderId} processing completed`
    );

    // --------------------------------
    // STEP 3 - Update order
    // --------------------------------

    console.log(
        `[WORKER] Updating order ${orderId} status...`
    );

    await orderRepository.update(
        orderId,
        {
            status: "COMPLETED"
        }
    );

    console.log(
        `[WORKER] Order ${orderId} marked COMPLETED`
    );

    // --------------------------------
    // STEP 4 - Send email
    // --------------------------------

    console.log(
        `[WORKER] Sending completion email...`
    );

    await sendOrderCompletedEmail({
        customerEmail: order.customerEmail,
        orderId: orderId
    });

    console.log(
        `[WORKER] Completion email sent`
    );

    // --------------------------------
    // STEP 5 - Delete SQS message
    // --------------------------------

    const deleteCommand = new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle
    });

    await sqsClient.send(deleteCommand);

    console.log(
        `[WORKER] SQS message deleted`
    );

    console.log("==============================================");
    console.log(
        `[WORKER] ORDER ${orderId} COMPLETED`
    );
    console.log("==============================================");
};


const startWorker = async () => {

    console.log("==============================================");
    console.log("[WORKER] Order worker started");
    console.log("==============================================");

    while (true) {

        try {

            const command = new ReceiveMessageCommand({
                QueueUrl: queueUrl,

                MaxNumberOfMessages: 1,

                WaitTimeSeconds: 20,

                VisibilityTimeout: 30
            });

            const response = await sqsClient.send(command);

            if (!response.Messages) {
                continue;
            }

            for (const message of response.Messages) {

                try {

                    await processOrderMessage(message);

                } catch (error) {

                    console.error(
                        "[WORKER] Order processing failed:",
                        error.message
                    );

                    /*
                     IMPORTANT:

                     We intentionally DO NOT delete
                     the SQS message.

                     SQS will make it visible again
                     after the visibility timeout.
                    */
                }
            }

        } catch (error) {

            console.error(
                "[WORKER] SQS error:",
                error.message
            );
        }
    }
};

startWorker();