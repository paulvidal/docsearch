import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.use(BootstrapVue);

// Import github css like stylesheet
import 'github-markdown-css/github-markdown.css'

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
