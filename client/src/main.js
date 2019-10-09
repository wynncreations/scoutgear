import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//import components
import Navbar from './components/Navbar'

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Navbar,
  store,
  render: h => h(App)
}).$mount('#app')
