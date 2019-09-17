import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import store from './store'
import PickUnit from './views/PickUnit.vue'
import Dashboard from './views/Dashboard.vue'
import Admin from './views/Admin.vue'
import EditScout from './views/EditScout.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        requiresRegistration: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresLoggedOut: true
      }
    }, {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresLoggedOut: true
      }
    },{
      path: '/pickUnit',
      name:'PickUnit',
      component: PickUnit
    },{
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name:'Admin',
      component: Admin,
      meta:{
        requiresAdminAuth: true
      }
    },
    {
      path: '/scout/edit',
      name: 'EditScout',
      component: EditScout,
      meta: {
        requiresAdminAuth: true
      }
    }
  ]
})


router.beforeEach((to,from,next)=>{
  //alert(from.path);

  if (to.matched.some(record => record.meta.requiresLoggedOut)) {

    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next('/');
    }
  }

  if(to.matched.some(record=> record.meta.requiresRegistration)){
    if(store.getters.me.unit_ID==='000000000000000000000000' && store.getters.isLoggedIn){
      //default value for an account that hasn't yet been assigned to a Unit, we want to redirect these folks.
      next('/pickUnit');
    }else{
      next();
    }
  }else{  
    next();
  }




  if (to.matched.some(record => record.meta.requiresAuth)) {
    //alert(this.$store.getters.isLoggedIn)
    if (this.$store.getters.isLoggedIn) {
      next();
    }
    next("/login");
  }
  if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    if (this.$store.getters.isLoggedIn && this.$store.getters.isAdmin) {
      next();
    } else if (!this.$store.getters.isLoggedIn || !this.$store.getters.isAdmin) {
      next("/");
    }
  } else {
    next();
  }

});


export default router;