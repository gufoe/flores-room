import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/home.vue'
import Results from './views/results/home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/admin/home.vue'),
      meta: { auth: true, admin: true },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/account.vue'),
      meta: { auth: true },
    },
    {
      path: '/host',
      name: 'host',
      component: () => import('./views/host/home.vue'),
      meta: { auth: true },
    },
    {
      path: '/places',
      name: 'manage-places',
      component: () => import('./views/host/manage-places.vue'),
      meta: { auth: true },
    },
    {
      path: '/places/:id/manage',
      name: 'manage-place',
      component: () => import('./views/host/manage-place.vue'),
      meta: { auth: true },
      children: [
        {
          path: 'rooms',
          name: 'manage-rooms',
          component: () => import('./views/host/manage-rooms.vue'),
          meta: { auth: true },
        },
        {
          path: 'rooms/:room_id?/edit',
          name: 'edit-room',
          component: () => import('./views/host/edit-room.vue'),
          meta: { auth: true },
        },
      ]
    },
    {
      path: '/places/:id?/edit',
      name: 'edit-place',
      component: () => import('./views/host/edit-place.vue'),
      meta: { auth: true },
    },
    {
      path: '/results/',
      name: 'results',
      component: Results,
      children: [
        {
          path: 'detail/:id',
          name: 'view-result',
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })
})

// eslint-disable-next-line
function auth ({ next, store }) {
  console.log('middleware check')
  if (!store.user) return next({ name: 'login' })
  console.log('middleware passed')
  return next()
}


export default router
