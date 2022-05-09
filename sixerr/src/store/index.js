import { createStore } from 'vuex';
import gigStore from './modules/gig.store.js';
import userStore from './modules/user.store.js'
import orderStore  from './modules/order.store.js';

const store = createStore({
    strict: true,
    state: {
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        gigStore,
        userStore,
        orderStore
    },
});

export default store;
