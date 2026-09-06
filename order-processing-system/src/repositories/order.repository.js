let orders = [];

const findAll = () => {
    return orders;
};

const findById = (id) => {
    return orders.find(order => order.id === id);
};

const create = (order) => {
    orders.push(order);
    return order;
};

const update = (id, updatedData) => {
    const index = orders.findIndex(order => order.id === id);

    if (index === -1) {
        return null;
    }

    orders[index] = {
        ...orders[index],
        ...updatedData
    };

    return orders[index];
};

const remove = (id) => {
    const index = orders.findIndex(order => order.id === id);

    if (index === -1) {
        return false;
    }

    orders.splice(index, 1);

    return true;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};