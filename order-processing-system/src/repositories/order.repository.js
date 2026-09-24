const pool = require("../config/database");

const findAll = async () => {

    const [rows] = await pool.query(
        "SELECT * FROM orders ORDER BY id DESC"
    );

    return rows.map(order => ({
        id: order.id,
        customerId: order.customer_id,
        productId: order.product_id,
        quantity: order.quantity,
        status: order.status,
        customerEmail: order.customer_email,
        createdAt: order.created_at
    }));
};

const findById = async (id) => {

    const [rows] = await pool.query(
        "SELECT * FROM orders WHERE id = ?",
        [id]
    );

    if (!rows[0]) {
        return null;
    }

    const order = rows[0];

    return {
        id: order.id,
        customerId: order.customer_id,
        productId: order.product_id,
        quantity: order.quantity,
        status: order.status,
        customerEmail: order.customer_email,
        createdAt: order.created_at
    };
};

const create = async (order) => {

    const [result] = await pool.query(
        `INSERT INTO orders
        (customer_id, product_id, quantity, status, customer_email)
        VALUES (?, ?, ?, ?, ?)`,
        [
            order.customerId,
            order.productId,
            order.quantity,
            order.status,
            order.customerEmail
        ]
    );

    return {
        id: result.insertId,
        customerId: order.customerId,
        productId: order.productId,
        quantity: order.quantity,
        status: order.status,
        customerEmail: order.customerEmail
    };
};

const update = async (id, updatedData) => {
    const fields = [];
    const values = [];

    if (updatedData.customerId !== undefined) {
        fields.push("customer_id = ?");
        values.push(updatedData.customerId);
    }

    if (updatedData.productId !== undefined) {
        fields.push("product_id = ?");
        values.push(updatedData.productId);
    }

    if (updatedData.quantity !== undefined) {
        fields.push("quantity = ?");
        values.push(updatedData.quantity);
    }

    if (updatedData.status !== undefined) {
        fields.push("status = ?");
        values.push(updatedData.status);
    }

    if (fields.length === 0) {
        return findById(id);
    }

    values.push(id);

    const [result] = await pool.query(
        `UPDATE orders
         SET ${fields.join(", ")}
         WHERE id = ?`,
        values
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findById(id);
};

const remove = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM orders WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};