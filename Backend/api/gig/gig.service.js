const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

async function query() {
    try {

        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('gig')
        var gigs = await collection.find().toArray()
        // Should get every gig's reviews:
        const usersByUsernameMap = {}
        const prms = gigs.map(async (gig) => {
            const userFromMap = usersByUsernameMap[gig.owner.fullname]
            if (userFromMap){
                return gig.reviews = userFromMap.reviews
            }
            return userService.getByUsername(gig.owner.fullname).then(gigOwner => {
                usersByUsernameMap[gig.owner.fullname] = gigOwner
                if (!gig.reviews) gig.reviews = []
                gig.reviews = gigOwner.reviews || []
            })
        })
        return Promise.all(prms).then(() => {
            return gigs
        })
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}




async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = await collection.findOne({ '_id': ObjectId(gigId) })
        const owner = await userService.getById(gig.owner._id)
        gig.reviews = owner.reviews 
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ '_id': ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.insertOne(gig)
        return gig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}
async function update(gig) {
    try {
        var id = ObjectId(gig._id)
        delete gig._id
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ "_id": id }, { $set: { ...gig } })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gigId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    // if (filterBy.category) {
    //     criteria.category = filterBy.category
    // }
    if (filterBy.name) {
        criteria.name = { $regex: filterBy.name, $options: 'i' }
    }
    // if(filterBy.inStock){
    //     const inStock = filterBy.inStock === 'true' ? true : false
    //     criteria.inStock = { $eq: inStock }
    // }
    if (filterBy.category && filterBy.labels.length) {
        criteria.category = { $in: filterBy.category }
        // criteria.labels = { $all: filterBy.labels }
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