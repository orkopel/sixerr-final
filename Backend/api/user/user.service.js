
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    addReviewToUser
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {

            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        return new Promise(async (resolve, reject)=> {
            const collection = await dbService.getCollection('user')
            console.log(userId);
            const user = await collection.findOne({ '_id': ObjectId(userId) })
            resolve(user)
        })
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByUsername(fullname) {
    try {
        return dbService.getCollection('user').then(collection => {
            return collection.findOne({ fullname }).then(user => user)
        })
    } catch (err) {
        logger.error(`while finding user ${fullname}`, err)
        throw err
    }
}
// async function getByUsername(username) {
//     try {
//         const collection = await dbService.getCollection('user')
//         const user = await collection.findOne({ username })
//         return user
//     } catch (err) {
//         logger.error(`while finding user ${username}`, err)
//         throw err
//     }
// }

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable fields!
        // const userToSave = {
        //     _id: ObjectId(user._id),
        //     username: user.username,
        //     fullname: user.fullname,
        //     score: user.score
        // }
        user._id = ObjectId(user._id)
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': user._id }, { $set: user })
        return user;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            score: user.score || 0 ,
            flag:"https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png"
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

async function addReviewToUser(review, aboutUserId) {
    // console.log('addReviewToUser', aboutUserId, review);
    try {
        review.createdAt = new Date()
        var userId = ObjectId(aboutUserId)
        console.log('aboutUserId with ObjectId', userId);
        const collection = await dbService.getCollection('user')
        console.log('after collection');
        await collection.updateOne({ _id: userId }, { $push: { reviews: review } })
        console.log('after updateOne');
        return review
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}
function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


