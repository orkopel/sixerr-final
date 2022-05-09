const orderService = require('./order.service.js');
const logger = require('../../services/logger.service')
const userService = require('../user/user.service')

// GET LIST
async function getOrders(req, res) {
    try {

        const filterBy = req.query
        console.log('Getting your orders..');
        orderService.query(filterBy).then(orders => {
            res.json(orders)
        })
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function getMyOrders(req, res) {
    try {
        if (!req.session.user) {
            logger.error('Failed to get orders, no user connect')
            res.status(401).send({ err: 'Unauthorized' })
            return
        }
        const userId = req.session.user._id
        const filterBy = { userId }
        console.log('Getting logged in orders..');
        orderService.query(filterBy).then(orders => {
            res.json(orders)
        })
    } catch (err) {
        console.log(err);
        logger.error('Failed to get user orders', err)
        res.status(500).send({ err: 'Failed to get user orders' })
    }
}




async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderService.getById(orderId)
        res.json(order)
    } catch (err) {
        logger.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

async function addOrder(req, res) {
    try {
        const order = req.body
        const addOrder = await orderService.add(order)

        res.json(addOrder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body;
        const updatedOrder = await orderService.update(order)
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })

    }
}

async function removeOrder(req, res) {
    try {
        const orderId = req.params.id;
        const removedId = await orderService.remove(orderId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove order', err)
        res.status(500).send({ err: 'Failed to remove order' })
    }
}

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder,
    getMyOrders
}
