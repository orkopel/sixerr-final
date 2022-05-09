import { orderService } from '../../services/order.service'
import { socketService } from '../../services/socket.service';
// import { socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_ABOUT_YOU } from '../../services/socket.service.js'

export default {
    state: {
        orders: []
    },
    getters: {
        getOrders(state) {
            return state.orders
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders;
        },
        saveOrder(state, { order }) {
            const idx = state.orders.findIndex((currOrder) => currOrder._id === order._id)
            if (idx !== -1) {
                state.orders.splice(idx, 1, order)
            } else {
                state.orders.push(order)
            }
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(order => order._id !== orderId)
        },
    },
    actions: {
        async addOrder({ state, commit }, { order }) {
            try {
                const savedOrder = await orderService.save(order)
                if (-1 === state.orders.findIndex((currOrder) =>
                    currOrder._id === savedOrder._id))
                    { socketService.emit('new order', savedOrder) }
                commit({ type: 'saveOrder', order: savedOrder })
            } catch {
                console.log('Cannot save order');
            }
        },
        async loadMyOrders({ commit, state }) {
            try {
                const orders = await orderService.getMyOrders()
                commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('Couldnt get user orders', err)
            }
        },
        removeOrder({ commit }, { orderId }) {
            orderService.removeOrder(orderId);
            commit({ type: 'removeOrder', orderId })
        },
        async approveOrder({ state, commit, dispatch }, { orderId }) {
            try {
                const { orders } = state
                const idx = orders.findIndex(order => order._id === orderId)
                if (idx !== -1) {
                    const updatedOrder = JSON.parse(JSON.stringify(orders[idx]))
                    updatedOrder.status = updatedOrder.status === 'approved' ? 'pending' : 'approved'
                    await dispatch({ type: 'addOrder', order: updatedOrder })
                    socketService.emit('order approved', updatedOrder)
                }

            } catch (err) {
                console.log(loggedinUser);
            }
        }
    }
}