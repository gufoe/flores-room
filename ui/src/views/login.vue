<template lang="html">
  <div class="is-middle text-center" style="padding: 3rem 1rem">
    <div v-if="$store.user">
      You are logged in and you should not be seeing this page
      <button @click="$store.logout()" class="btn btn-danger">Logout</button>
      <!-- <pre>{{ $store.user }}</pre> -->

      <a v-if="$store.user.auth_driver == 'facebook'" target="_blank" :href="`https://www.facebook.com/app_scoped_user_id/${$store.user.auth_id}`">Go to PROFILE</a>
    </div>
    <div v-else>
      <h1 v-if="!nested" class="nm mb-4">Login</h1>
      <div v-if="is_loading">
        Loading...
      </div>
      <div v-else>
        <div class="mb-4">
          You can login or signup using the button below
        </div>

        <button @click="login_fb()" class="btn" style="background: #3b5998; color: #fff">
          Login with Facebook
        </button>

        <div v-if="!nested" class="my-4">
          Flores Room version <code>{{ $store.ui_version }}</code>
        </div>
        <div v-if="!nested" class="pb-5">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nested: {
      type: Boolean,
    },
  },

  data () {
    return {
      is_loading: true,
    }
  },

  mounted () {
    this._int = setInterval(() => {
      if (!window.FB || !window.FB.__ready) return

      console.log('fb found')
      clearInterval(this._int)

      window.FB.init({
        appId            : this.$config.fb_key,
        autoLogAppEvents : false,
        xfbml            : false,
        version          : 'v4.0'
      })

      window.FB.getLoginStatus(() => {
        console.log('login status found')
        this.is_loading = false
      });
    }, 200)
  },

  beforeDestroy () {
    clearInterval(this._int)
  },

  methods: {
    login_fb() {
      this.is_loading = true
      window.FB.login(res => {
        if (res.authResponse) {
          this.$store.loginWithDriver('facebook', null, res.authResponse.accessToken, {
            finally: () => { this.is_loading = false }
          })
        } else {
          this.is_loading = false
        }
      })
    },
  },
}
</script>

<style lang="css">
</style>
