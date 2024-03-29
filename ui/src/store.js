import utils from './utils'

let ui_version = utils.hash(document.head.innerHTML)

export default {
  ui_version,
  is_ready: false,
  user: null,
  $http: null,
  place_types: ['homestay', 'residence', 'guesthouse', 'hostel', 'hotel'],
  place_perks: ['coffee-tea', 'restaurant', 'bar', 'swimming-pool', 'pool-table'],
  room_perks: ['ac', 'desk', 'private-bathroom', 'hot-shower', 'window', 'terrace'],
  bed_types: ['single', 'double', 'single-bunk', 'double-bunk'],

  install (Vue) {
    this.$http = Vue.prototype.$http
    this.refreshUser({
      finally: () => this.is_ready = true
    })
  },

  refreshUser (cbs) {
    cbs = cbs || {}
    let token = localStorage.getItem('token')

    if (!token) {
      cbs.fail && cbs.fail()
      cbs.finally && cbs.finally()
      return false
    }

    this.updateToken(token)

    this.$http.get('user')
    .then(res => {
      this.updateUser(res.data)
      cbs.success && cbs.success()
    }, () => {
      this.updateUser(null)
      this.updateToken(null)
      cbs.fail && cbs.fail()
    })
    .finally(() => {
      cbs.finally && cbs.finally()
    })
    return true
  },

  loginWithDriver (driver, id, token, cbs) {
    cbs = cbs || {}
    this.$http.post('login', {
      driver, id, token
    })
    .then(res => {
      this.updateUser(res.data.user)
      this.updateToken(res.data.token)
      cbs.success && cbs.success()
    }, () => {
      this.updateUser(null)
      this.updateToken(null)
      cbs.fail && cbs.fail()
    })
    .finally(() => {
      cbs.finally && cbs.finally()
    })
  },

  updateUser (user) {
    this.user = user
  },

  updateToken (token) {
    if (!token) {
      delete this.$http.defaults.headers.common['Authorization']
    } else {
      this.$http.defaults.headers.common['Authorization'] = token
    }
    localStorage.setItem('token', token || '')
  },

  logout () {
    this.$http.post('logout')
    this.updateToken(null)
    this.updateUser(null)
  }

}
