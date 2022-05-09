const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    // console.log('%c req.params.id:','color:green', req.params.id);
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        console.log('updateUser() savedUser', savedUser);
        req.session.user = savedUser
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}
async function addReviewToUser(req, res) {
    try {
        const { review, aboutUserId } = req.body;
        const addedReview = await userService.addReviewToUser(review, aboutUserId)
        console.log('addedReview from controller', addedReview);
        res.json(addedReview)
    } catch (err) {
        logger.error('Failed to add gig', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addReviewToUser
}