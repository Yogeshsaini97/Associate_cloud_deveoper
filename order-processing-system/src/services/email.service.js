const nodemailer = require("nodemailer");

// Brevo SMTP configuration
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,

    auth: {
        user: "baedfa001@smtp-brevo.com",
        pass: "xsmtpsib-ff2216b7b9a7c29a5883e81bd18d1f6459f1977e89f37275acf12cd0d3aeae24-ToExyk1JSh2zJag"
    }
});

// Send order completion email
const sendOrderCompletedEmail = async ({
    customerEmail,
    orderId
}) => {

    console.log(`[EMAIL] Preparing email for order ${orderId}`);

    const mailOptions = {
        from: "yogeshsaini2912@gmail.com",

        to: "yogeshsaini95401@gmail.com",

        subject: `Order #${orderId} Completed`,

        text: `
Hello,

Your order #${orderId} has been successfully completed.

Order ID: ${orderId}

Thank you for your order.

Order Processing System
        `
    };

    console.log(
        `[EMAIL] Sending email to ${customerEmail}...`
    );

    const response = await transporter.sendMail(mailOptions);

    console.log(
        `[EMAIL] Email sent successfully`
    );

    console.log(
        `[EMAIL] Message ID: ${response.messageId}`
    );

    return response;
};

module.exports = {
    sendOrderCompletedEmail
};