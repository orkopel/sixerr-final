import { httpService } from './http.service';

const ENDPOINT = 'order'

export const orderService = {
    query,
    save,
    getById,
    remove,
    getEmptyOrder,
    getMyOrders
}

async function query(filterBy) {
    return await httpService.get(ENDPOINT, filterBy)
}

async function save(order) {
    return order._id
        ? await httpService.put(`${ENDPOINT}/${order._id}`, order)
        : await httpService.post(ENDPOINT, order)
    // return toy._id ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
}

async function getById(id) {
    return await httpService.get(`${ENDPOINT}/${id}`)

}

async function getMyOrders() {
    return await httpService.get(`${ENDPOINT}/myOrders`)
}

async function remove(id) {
    return await httpService.delete(`${ENDPOINT}/${id}`)
    // return axios.delete(BASE_URL + id).then((res) => res.data)
    // return storageService.remove(KEY, id)
}

function getEmptyOrder() {
    return {
        createdAt: new Date(),
        buyer: {
            _id: '',
            name: ''
        },
        seller: {
            _id: '',
            name: ''
        },
        gig: {
            _id: '',
            name: '',
            price: '',
            title: ''
        },
        status: 'pending'
    };
}


// // import { httpService } from './http-service'
// import { storageService } from './async-storage-service.js'
// import { utilService } from './util-service.js'
// const ORDER_KEY = 'orders'

// export const orderService = {
//     query,
//     addOrder,
//     removeOrder,
//     getOrderById,
//     getEmptyOrder
// }

// _createOrders()

// function query() {
//     return storageService.query(ORDER_KEY)
// }

// function getOrderById(orderId) {
//     console.log('orderId:', orderId);
//     return storageService.get(ORDER_KEY, orderId);
// }

// function addOrder(order) {
//     return storageService.post(ORDER_KEY, order);
// }

// function removeOrder(orderId) {
//     return storageService.delete(ORDER_KEY, orderId)

// }



function _createOrders() {
    let orders = utilService.loadFromStorage(ORDER_KEY);
    if (!orders || !orders.length) {
        orders = [
            {
                _id: "o1225",
                createdAt: 9898989,
                buyer: "mini-user",
                seller: "mini-user",
                gig: {
                    _id: "i101",
                    name: "Design Logo",
                    price: 20
                },
                status: 'pending'
            }]

        utilService.saveToStorage(ORDER_KEY, orders);
    }
    return orders;
}
