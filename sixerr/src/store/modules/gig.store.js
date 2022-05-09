import { gigService } from '../../services/gig.service.js'

export default {
  state: {
    gigs: null,
    filterBy: { title: '', catergory: '', delivery: ''},
    categories: gigService.getCategories(),
    // filterBy: null,
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getGigs({ filterBy, gigs }) {
      if (!gigs) return
      var gigs = JSON.parse(JSON.stringify(gigs))
      if (filterBy.title) {
        gigs - gigs.filter(gig => gig.title.includes(filterBy.title))
      }
      if (filterBy.category) {
        gigs = gigs.filter(gig => gig.category === filterBy.category)
      }
      if (filterBy.delivery) {
        gigs = gigs.filter(gig => gig.daysToMake <= filterBy.delivery)
      }
      if (filterBy.level) {

        gigs = gigs.filter(gig => gig.owner.level === filterBy.level)
      }
      return gigs
    },

    // getGigs({ gigs, filterBy }) {
    //   console.log(filterBy);
    //   if (!filterBy) return gigs
    //   const gigsDisplay = JSON.parse(JSON.stringify(gigs))
    //   const regex = new RegExp(filterBy.title, 'i')

    //   if (filterBy.category) {
    //     return gigsDisplay?.filter((gig) => gig.category === filterBy.category)
    //   }
    //   function isMatchText(gig) {
    //     if (!filterBy.title) return true
    //     return regex.test(gig.title)
    //   }
    //   function isMatchCategory(gig) {
    //     if (!filterBy.category) return true
    //     return gig.category === filterBy.category
    //   }

    //   function isMatchDelivery(gig) {
    //     if (!filterBy.delivery) return true
    //     return gig.daysToMake <= filterBy.delivery
    //   }
    //   function isMatchSellerLevel(gig) {
    //     return gig.owner.level === filterBy.level
    //   }

    //   return gigsDisplay.filter((gig) => isMatchText(gig) && isMatchCategory(gig) && isMatchDelivery(gig) && isMatchSellerLevel(gig));
    // }
    // getGigs(state) {
    //   return state.gigs
    // },
  },
  mutations: {
    setGigs(state, { gigs }) {
      state.gigs = gigs;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    saveGig(state, { gig }) {
      const idx = state.gigs.findIndex((currGig) => currGig._id === gig._id)
      if (idx !== -1) state.gigs.splice(idx, 1, gig)
      else state.gigs.push(gig)
    },
  },
  actions: {
    getById({ state }, { _id }) {
      return state.gigs.find(gig => gig._id === _id)
    },
    async loadGigs({ commit, state }) {
      try {
        const gigs = await gigService.query(state.filterBy)
        commit({ type: 'setGigs', gigs })
      } catch {
        console.log('error');
      }
    },
    async saveGig({ dispatch }, payload) {
      try {
        await gigService.save(payload.gig)
        dispatch('loadGigs')
      } catch (err) {
        console.log('Couldnt save gig', err)
        commit({
          type: 'setIsError',
          isError: true
        })
      }
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
      dispatch({ type: 'loadGigs' })
    },
  }
}

