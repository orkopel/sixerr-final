import { userService } from "../../services/user.service"
import { socketService } from '../../services/socket.service'

export default {
    state: {
        users: null,
        user: null,
        // loggedinUser: userService.getLoggedinUser(),
        loggedinUser: null,
        reviews: [],
        userMsg: null
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        userMsg({ userMsg }) {
            return userMsg
        },
        loggedinUser({ loggedinUser }) { return JSON.parse(JSON.stringify(loggedinUser)) },
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = (user) ? user : null;
        },
        addReview(state, { reviews }) {
            //service -> backend-> add review user
            state.user.reviews = reviews
        },
        // saveUser(state, { user }) {
        //     const idx = state.users.findIndex((currGig) => currGig._id === gig._id)
        //     if (idx !== -1) state.gigs.splice(idx, 1, gig)
        //     else state.gigs.push(gig)
        //   },
        setUserMsg(state, { msg }) {
            state.userMsg = msg
        }
    },
    actions: {
        setUserMsg({ commit }, { msg }) {
            commit({ type: 'setUserMsg', msg })
            setTimeout(() => {
                commit({ type: 'setUserMsg', msg: '' })
            }, 3000)
        },
        async save({ commit }, { user }) {
            const savedUser = await userService.save(user)
            commit({ type: 'setLoggedinUser', user: savedUser })
        },
        async fetchLoggedinUser({ commit, dispatch }) {
            const user = await userService.fetchLoggedinUser()
            commit({ type: 'setLoggedinUser', user })
            if (!user) return
            socketService.emit('watch user', user._id)
            socketService.off('order update')
            socketService.on('order update', (order) => {
                commit({ type: 'saveOrder', order })
            })
            socketService.on('user msg', (msg) => {
                dispatch({ type: 'setUserMsg', msg })
            })
        },
        async login({ commit, dispatch }, { cred }) {
            const user = await userService.login(cred)
            commit({ type: 'setLoggedinUser', user })
            socketService.emit('watch user', user._id)
            socketService.off('order update')
            socketService.on('order update', (order) => {
                commit({ type: 'saveOrder', order })
            })
            socketService.on('user msg', (msg) => {
                dispatch({ type: 'setUserMsg', msg })
            })
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }
        },
        async loadUsers({ commit, state }) {
            try {
                const users = await userService.query()
                commit({ type: 'setUsers', users })
            } catch {
                console.log('error');
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async addNewReview(context, { review, aboutUserId }) {
            try {
                const addedReview = await userService.addReviewToUser(review, aboutUserId)
                // context.dispatch({type: 'increaseScore'})
                return addedReview
            } catch (err) {
                console.log('reviewStore: Error in addReview', err)
                throw err
            }
        },
    }
}