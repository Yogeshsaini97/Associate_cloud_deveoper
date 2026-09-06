const { expect } = require("chai");
const sinon = require("sinon");

const orderService = require("../src/services/order.service");
const orderRepository = require("../src/repositories/order.repository");

describe("Order Service", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("should return an order when it exists", () => {

        const fakeOrder = {
            id: 123,
            customerId: 101,
            productId: 5001,
            quantity: 2,
            status: "CREATED"
        };

        sinon
            .stub(orderRepository, "findById")
            .returns(fakeOrder);

        const result = orderService.getOrderById(123);

        expect(result).to.equal(fakeOrder);

    });

});