const request = require("supertest");
const { expect } = require("chai");

const app = require("../src/app");

describe("Order API", () => {

    describe("GET /health", () => {

        it("should return 200", async () => {

            const response = await request(app)
                .get("/health");

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal("UP");

        });

    });

    describe("POST /api/orders", () => {

        it("should create a new order", async () => {

            const response = await request(app)
                .post("/api/orders")
                .send({
                    customerId: 101,
                    productId: 5001,
                    quantity: 2
                });

            expect(response.status).to.equal(201);

            expect(response.body).to.have.property("id");
            expect(response.body.customerId).to.equal(101);
            expect(response.body.productId).to.equal(5001);
            expect(response.body.quantity).to.equal(2);
            expect(response.body.status).to.equal("CREATED");

        });

        it("should reject an order with invalid quantity", async () => {

    const response = await request(app)
        .post("/api/orders")
        .send({
            customerId: 101,
            productId: 5001,
            quantity: -5
        });

    expect(response.status).to.equal(400);

    expect(response.body.success).to.equal(false);

});

it("should return 404 when order does not exist", async () => {

    const response = await request(app)
        .get("/api/orders/999999999");

    expect(response.status).to.equal(404);

    expect(response.body.success).to.equal(false);

    expect(response.body.message)
        .to.equal("Order not found");

});
    });

});