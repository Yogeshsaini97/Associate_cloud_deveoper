const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const colors = [
    "\x1b[33m", // Yellow
    "\x1b[32m", // Green
    "\x1b[34m", // Blue
    "\x1b[35m", // Magenta
    "\x1b[31m", // Red
    "\x1b[36m"  // Cyan
];

const reset = "\x1b[0m";

const processOrder = async (
    orderData,
    requestId,
    requestNumber
) => {

    const color =
        colors[(requestNumber - 1) % colors.length];

    const log = (message) => {
        console.log(
            `${color}[${requestId}]${reset} ${message}`
        );
    };

    console.log("=================================");

    log("ORDER PROCESSING STARTED");

    console.time(`TOTAL ORDER PROCESSING ${requestId}`);

    // STEP 1
    log("1. Validating order...");
    console.time(`Validation ${requestId}`);

    await delay(1000);

    console.timeEnd(`Validation ${requestId}`);
    log("Validation completed");

    // STEP 2
    log("2. Creating order in database...");
    console.time(`Database ${requestId}`);

    await delay(2000);

    console.timeEnd(`Database ${requestId}`);
    log("Order created");

    // STEP 3
    log("3. Processing payment...");
    console.time(`Payment ${requestId}`);

    await delay(3000);

    console.timeEnd(`Payment ${requestId}`);
    log("Payment completed");

    // STEP 4
    log("4. Checking inventory...");
    console.time(`Inventory ${requestId}`);

    await delay(2000);

    console.timeEnd(`Inventory ${requestId}`);
    log("Inventory available");

    // STEP 5
    log("5. Sending email...");
    console.time(`Email ${requestId}`);

    await delay(2000);

    console.timeEnd(`Email ${requestId}`);
    log("Email sent");

    console.timeEnd(`TOTAL ORDER PROCESSING ${requestId}`);

    log("ORDER PROCESSING COMPLETED");

    console.log("=================================");

    return {
        message: "Order processed successfully",
        order: orderData,
        requestId
    };
};

module.exports = {
    processOrder
};