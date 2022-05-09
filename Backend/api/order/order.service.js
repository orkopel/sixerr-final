const { log } = require('../../middlewares/logger.middleware')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray()
        // console.log(orders);
        //TODO - get orders for user

        return orders
    } catch (err) {
        logger.error('Cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ '_id': ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ '_id': ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        // console.log('addedOrder', order);
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}
async function update(order) {
    try {
        var id = ObjectId(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ "_id": id }, { $set: { ...order } })
        order._id = id
        return order
    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.userId) {
        criteria['$or'] = [{ 'buyer._id': filterBy.userId }, { 'seller._id': filterBy.userId }]
        // console.log(criteria);
        // criteria['buyer._id'] = filterBy.userId
    }

    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}