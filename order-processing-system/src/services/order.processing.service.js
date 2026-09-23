const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const processOrder = async (orderData, requestId) => {

    console.log("=================================");
    console.log(`[${requestId}] ORDER PROCESSING STARTED`);
    console.log("=================================");

    console.time(`TOTAL ORDER PROCESSING ${requestId}`);

    // STEP 1
    console.log(`[${requestId}] 1. Validating order...`);
    console.time(`Validation ${requestId}`);

    await delay(1000);

    console.timeEnd(`Validation ${requestId}`);
    console.log(`[${requestId}] Validation completed`);

    // STEP 2
    console.log(`[${requestId}] 2. Creating order in database...`);
    console.time(`Database ${requestId}`);

    await delay(2000);

    console.timeEnd(`Database ${requestId}`);
    console.log(`[${requestId}] Order created`);

    // STEP 3
    console.log(`[${requestId}] 3. Processing payment...`);
    console.time(`Payment ${requestId}`);

    await delay(3000);

    console.timeEnd(`Payment ${requestId}`);
    console.log(`[${requestId}] Payment completed`);

    // STEP 4
    console.log(`[${requestId}] 4. Checking inventory...`);
    console.time(`Inventory ${requestId}`);

    await delay(2000);

    console.timeEnd(`Inventory ${requestId}`);
    console.log(`[${requestId}] Inventory available`);

    // STEP 5
    console.log(`[${requestId}] 5. Sending email...`);
    console.time(`Email ${requestId}`);

    await delay(2000);

    console.timeEnd(`Email ${requestId}`);
    console.log(`[${requestId}] Email sent`);

    console.timeEnd(`TOTAL ORDER PROCESSING ${requestId}`);

    console.log("=================================");
    console.log(`[${requestId}] ORDER PROCESSING COMPLETED`);
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