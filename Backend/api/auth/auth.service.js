const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    console.log('password',password);
    logger.debug(`auth.service - login with username: ${username}`)
    console.log(username);
    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username ')
    console.log('user:', user.password);
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid  password')

    delete user.password
    user._id = user._id.toString()
    return user
}




async function signup(username, password, fullname) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname })
}

module.exports = {
    signup,
    login
}