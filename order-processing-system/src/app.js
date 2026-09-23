const express = require("express");

const orderRoutes = require("./routes/order.routes");
const errorHandler = require("./middleware/error.middleware");
const orderProcessingRoutes = require(
    "./routes/order.processing.routes"
);

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Order Processing System is running"
    });
});

app.use("/api/orders", orderRoutes);

app.use("/orders",orderProcessingRoutes);

// Error middleware MUST come after routes
app.use(errorHandler);



module.exports = app;