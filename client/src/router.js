import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresLoggedOut: true
      }
    }
  ]
})


router.beforeEach((to,from,next)=>{
  if (to.matched.some(record => record.meta.requiresLoggedOut)) {

    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next('/');
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    if (store.getters.isLoggedIn && store.getters.isAdmin) {
      next();
    } else if (store.getters.isLoggedIn && !store.getters.isAdmin) {
      next("/");
    }
  } else {
    next();
  }

});


export default router;