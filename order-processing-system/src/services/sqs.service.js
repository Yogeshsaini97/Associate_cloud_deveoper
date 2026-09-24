const {
    SQSClient,
    SendMessageCommand
} = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
    region: "ap-south-1"
});

const queueUrl =
    "https://sqs.ap-south-1.amazonaws.com/851435022215/order-processing-queue";

const sendMessage = async (message) => {

    const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message)
    });

    const response = await sqsClient.send(command);

    return response;
};

module.exports = {
    sendMessage
};