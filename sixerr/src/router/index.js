import { createRouter, createWebHashHistory } from 'vue-router'
import gigApp from '../views/gig-app.vue'
import explore from '../views/explore.vue'
import gigDetails from '../views/gig-details.vue'
import category from '../views/category.vue'
import userProfile from '../views/user-profile.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top:0 };
  },
  routes: [
    {
      path: '/',
      name: 'gig-app',
      component: gigApp,
      meta: {
        headerClass: 'fixed',
        logoClass: 'white',
        bodyClass: 'modal-open'
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: explore,
      meta: {
        headerClass: 'border relative'
      }
    },
    {
      path: '/explore/:category',
      name: 'explore-category',
      component: category,
      meta: {
        headerClass: 'border relative'
      }
    },
    {
      path: '/gig/:_id',
      name: 'gig-details',
      component: gigDetails,
      meta: {
        headerClass: 'border relative'
      }
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: userProfile,
      meta: {
        headerClass: 'border relative'
      }
    },
  ],
  mode: 'history'
})

export default router
