const nodemailer = require("nodemailer");

// Brevo SMTP configuration
const transporter = nodemailer.createTransport({
    hos: "smtp-relay.brevo.com",
    port: 587,
    secure: false,

    auth: {
        user: "",
        pass: ""
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