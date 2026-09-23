const orderProcessingService = require("../services/order.processing.service");

const processOrder = async (req, res, next) => {

    try {

        console.time("API REQUEST");

        const result = await orderProcessingService.processOrder(
            req.body
        );

        console.timeEnd("API REQUEST");

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
};

module.exports = {
    processOrder
};