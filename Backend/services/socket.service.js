// const asyncLocalStorage = require('./als.service');
// const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })

    // gIo = require('socket.io')(http);

    // const sharedSession = require('express-socket.io-session');

    // gIo.use(sharedSession(session, {
    //     autoSave: true
    // }));

    gIo.on('connection', socket => {
        // console.log('socket connection', socket.handshake.sessionID);
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // console.log('socket', socket);
        // TODO: emitToUser feature - need to tested for CaJan21
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', socket => {
            if (socket.handshake) {
                console.log('socket disconnect');
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })

        // gIo.on('connection', socket => {
        //     socket.userId = socket.id
        //     console.log('New socket', socket.id)
        //     socket.on('disconnect', socket => {
        //         console.log('Someone disconnected')
        //     })
        //     socket.on('chat topic', topic => {
        //         if (socket.myTopic === topic) return;
        //         if (socket.myTopic) {
        //             socket.leave(socket.myTopic)
        //         }
        //         socket.join(topic)
        //         socket.myTopic = topic
        //     })
        //     socket.on('chat newMsg', msg => {
        //         console.log('Emitting Chat msg', msg);
        //         // emits to all sockets:
        //         // gIo.emit('chat addMsg', msg)
        //         // Broadcasting manually:
        //         socket.broadcast.to(socket.myTopic).emit('chat addMsg', msg)
        //         // emits only to sockets in the same room
        //         // gIo.to(socket.myTopic).emit('chat addMsg', msg)
        //     })
        //     socket.on('chat typing', ({ username, isDoneTyping = false }) => {
        //         // console.log('username',username);
        //         // console.log('username',username);
        //         console.log('broadcasting chat typing');
        //         broadcast({ type: 'chat userTyping', data: { username, isDoneTyping }, room: socket.myTopic, userId: socket.userId })
        //     })
        //     socket.on('chat typing', ({ username, isDoneTyping = false }) => {
        //         console.log('username', username);
        //         console.log('isDoneTyping', isDoneTyping);
        //         //broadcasting manually
        //         socket.broadcast.to(socket.myTopic).emit('chat test', { username, isDoneTyping })
        //         // broadcasting using built function
        //         // broadcast({ type: 'chat test', data: { username, isDoneTyping }, room: socket.myTopic, userId: socket.userId })

        //     })
        socket.on('watch user', watchedUserId => {
            console.log('watch user', watchedUserId);
            if (socket.watchedUserId === watchedUserId) return;
            if (socket.watchedUserId) {
                socket.leave(socket.watchedUserId)
            }
            socket.join(watchedUserId)
            socket.watchedUserId = watchedUserId
        })
        socket.on('new order', order => {
            // console.log('new order', order);
            socket.broadcast.to(order.seller._id).emit('order update', order)
            socket.broadcast.to(order.buyer._id).emit('order update', order)
            socket.broadcast.to(order.seller._id).emit('user msg', {type:order.status, txt: `New order recived - ${order._id} is ${order.status}`})
            // if (!order.ops) return emitToBuyerSeller(order)
            // emitToBuyerSeller(order.ops[0])
            // emitToBuyerSeller(order)
        })
        socket.on('order approved', order => {
            // console.log('order approved', order);
            // if (!order.ops) return emitToBuyerSeller(order)
            // emitToBuyerSeller(order)
            //  Broadcasting manually:
            socket.broadcast.to(order.seller._id).emit('order update', order)
            socket.broadcast.to(order.buyer._id).emit('order update', order)
            socket.broadcast.to(order.buyer._id).emit('user msg', {type:order.status, txt: `Your order ${order._id} is ${order.status}`})
        })
    })
}

async function emitToBuyerSeller(order) {
    const sockets = await gIo.fetchSockets();
    sellerBuyerSockets = sockets.filter(socket => socket.watchedUserId &&
        (socket.watchedUserId === order.buyer._id || socket.watchedUserId === order.seller._id))
    console.log('sellerBuyerSockets.length', sellerBuyerSockets.length);
    sellerBuyerSockets.forEach(socket => {
        console.log('watchedUserId', socket.watchedUserId);
        gIo.to(socket.watchedUserId).emit('order update', order)
    })
}


// async function emitToWatchedUsers(msg) {
//     const sockets = await gIo.fetchSockets();
//     socketsWithUsers = sockets.filter(socket => socket.watchedUserId)
//     console.log('socketsWithUsers.length', socketsWithUsers.length);
//     socketsWithUsers.forEach(socket => {
//         console.log('Hey', socket.watchedUserId);
//         gIo.to(socket.watchedUserId).emit('shop changed', msg)
//     })
// }

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

// async function emitToUser({ type, data, userId }) {
//     logger.debug('Emiting to user socket: ' + userId)
//     const socket = await _getUserSocket(userId)
//     if (socket) socket.emit(type, data)
//     else {
//         console.log('User socket not found');
//         _printSockets();
//     }
// }

// // Send to all sockets BUT not the current socket 
// async function broadcast({ type, data, room = null, userId }) {
//     console.log('BROADCASTING', JSON.stringify(arguments));
//     const excludedSocket = await _getUserSocket(userId)
//     if (!excludedSocket) {
//         // logger.debug('Shouldnt happen, socket not found')
//         // _printSockets();
//         return;
//     }
//     logger.debug('broadcast to all but user: ', userId)
//     if (room) {
//         excludedSocket.broadcast.to(room).emit(type, data)
//     } else {
//         excludedSocket.broadcast.emit(type, data)
//     }
// }

// async function _getUserSocket(userId) {
//     const sockets = await _getAllSockets();
//     const socket = sockets.find(s => s.userId == userId)
//     return socket;
// }
// async function _getAllSockets() {
//     // return all Socket instances
//     const sockets = await gIo.fetchSockets();
//     return sockets;
// }

// async function _printSockets() {
//     const sockets = await _getAllSockets()
//     console.log(`Sockets: (count: ${sockets.length}):`)
//     sockets.forEach(_printSocket)
// }
// function _printSocket(socket) {
//     console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
// }

module.exports = {
    connectSockets,
    emitTo,

}