import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//import components
import Navbar from './components/Navbar'

Vue.use(Vuex);

Vue.config.productionTip = false
VueResource.options.root = "http://api.scoutsgeared.com"
Vue.http.options.root = "http://api.scoutsgeared.com"

new Vue({
  router,
  vuetify,
  Navbar,
  store,
  render: h => h(App)
}).$mount('#app')
