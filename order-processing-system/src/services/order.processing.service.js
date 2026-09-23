const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const processOrder = async (orderData) => {

    console.log("=================================");
    console.log("ORDER PROCESSING STARTED");
    console.log("=================================");

    console.time("TOTAL ORDER PROCESSING");

    // STEP 1
    console.log("1. Validating order...");
    console.time("Validation");

    await delay(1000);

    console.timeEnd("Validation");
    console.log("Validation completed");

    // STEP 2
    console.log("2. Creating order in database...");
    console.time("Database");

    await delay(2000);

    console.timeEnd("Database");
    console.log("Order created");

    // STEP 3
    console.log("3. Processing payment...");
    console.time("Payment");

    await delay(3000);

    console.timeEnd("Payment");
    console.log("Payment completed");

    // STEP 4
    console.log("4. Checking inventory...");
    console.time("Inventory");

    await delay(2000);

    console.timeEnd("Inventory");
    console.log("Inventory available");

    // STEP 5
    console.log("5. Sending email...");
    console.time("Email");

    await delay(2000);

    console.timeEnd("Email");
    console.log("Email sent");

    console.timeEnd("TOTAL ORDER PROCESSING");

    console.log("=================================");
    console.log("ORDER PROCESSING COMPLETED");
    console.log("=================================");

    return {
        message: "Order processed successfully",
        order: orderData
    };
};

module.exports = {
    processOrder
};