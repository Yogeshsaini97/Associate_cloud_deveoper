const { sendMessage } = require("./services/sqs.service");

async function testSQS() {

    try {

        const response = await sendMessage({
            orderId: 1000,
            customerId: 55,
            productId: 5001,
            quantity: 2
        });

        console.log("Message sent successfully");
        console.log("Message ID:", response.MessageId);

    } catch (error) {

        console.error("Failed to send message");
        console.error(error);

    }
}

testSQS();