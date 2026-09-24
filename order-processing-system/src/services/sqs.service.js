const {
    SQSClient,
    SendMessageCommand
} = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
    region: "ap-south-1"
});

const queueUrl =
    "https://sqs.ap-south-1.amazonaws.com/851435022215/order-processing-queue";

const sendMessage = async (message, requestId) => {

    console.log(`[${requestId}] SQS: Preparing message...`);

    console.log(
        `[${requestId}] SQS: Message body:`,
        JSON.stringify(message)
    );

    const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message)
    });

    console.log(`[${requestId}] SQS: Sending message...`);

    const response = await sqsClient.send(command);

    console.log(
        `[${requestId}] SQS: Message sent successfully`
    );

    console.log(
        `[${requestId}] SQS: Message ID: ${response.MessageId}`
    );

    return response;
};

module.exports = {
    sendMessage
};