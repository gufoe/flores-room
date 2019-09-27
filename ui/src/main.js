import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import config from './config'
import utils from './utils'
import store from './store'
import locale from './locale'
import './install-directives'
import './install-components'
import './install-plugins'
// import './registerServiceWorker'
import './theme.scss'

Vue.config.productionTip = false



// HTTP service
axios.defaults.baseURL = config.api_url;
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  config.paramsSerializer = params => qs.stringify(params, { arrayFormat: "brackets", encode: false })
  return config
})
axios.interceptors.response.use(res => res, err => {
  console.log(err)
  window.err = err
  let message = ''
  if (!err.response) {
    message = err.message
  } else if ([400, 401, 403, 500].includes(err.response.status)) {
    store.root.$bvModal.msgBoxOk(err.response.data.message, {
      title: 'Error!',
      size: 'sm',
      okVariant: 'danger',
      headerClass: 'p-2  text-center border-bottom-0 text-danger',
      bodyClass: 'py-1 px-2 text-center ',
      footerClass: 'p-2 border-top-0 text-center ',
      centered: true,
    })
  }

  return Promise.reject(err)
})

// Globals
Vue.prototype.$store = window.$store = store
Vue.prototype.$utils = window.$utils = utils
Vue.prototype.$config = window.$config = config

// Utc helper
Vue.prototype.$utc = str => {
  if (!str) return new Date()
  let pieces = str.match(/\d+/g)
  return new Date(Date.UTC(pieces[0], pieces[1]-1, pieces[2], pieces[3] || 0, pieces[4] || 0, pieces[5] || 0))
}
Date.prototype.toStdLocal = function() {
  return this.getFullYear() + '-' +
  ('00' + (this.getMonth()+1)).slice(-2) + '-' +
  ('00' + this.getDate()).slice(-2)
}
Date.prototype.nextDay = function() {
  return new Date(this.getTime() + 86400000)
}

// Plugins
Vue.use(store)
Vue.use(VueI18n)




window.Vue = Vue
window.vue = new Vue({
  i18n: new VueI18n(locale),
  data: {
    store,
    config,
  },
  router,
  render: h => h(App),
}).$mount('#app')
