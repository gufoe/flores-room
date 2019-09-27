<template>
  <div id="app" class="full-height">
    <loading-screen v-if="!$store.is_ready">
      Loading page...
    </loading-screen>
    <div v-else class="full-height">
      <div class="row menu">
        <div @click="$router.push({ name: 'home' })" :selected="$route.name == 'home'">
          <span>Home</span>
        </div>
        <div v-if="$store.user" @click="$router.push({ name: 'account' })" :selected="$route.name == 'account'">
          <span>Account</span>
        </div>
        <div v-if="$store.user && $store.user.places.length" @click="$router.push({ name: 'manage-places' })" :selected="['manage-places'].includes($route.name)">
          <span>Places</span>
        </div>
        <div v-if="$store.user && $store.user.is_admin" @click="$router.push({ name: 'admin' })" :selected="['admin'].includes($route.name)">
          <span>Admin</span>
        </div>
      </div>
      <login v-if="needs_login" id="content"/>
      <div v-else-if="!is_allowed" id="content" class="text-center is-middle pb-5">
        <h1>Not Allowed</h1>
        <i>You do not have the permissions to view this page</i>
      </div>
      <div v-else class="full-height-scroll" id="content">
        <router-view class="animate-fadein"/>
      </div>
    </div>
  </div>

</template>
<script>
import login from './views/login.vue'

export default {
  components: {
    login,
  },

  data () {

    console.log(this.$bvModal.msgBoxOk)
    return {
      modals: [{
        title: 'Error',
        text: 'ciao',
      }],
    }
  },

  created () {
    this.$store.root = this
  },

  computed: {
    needs_login () {
      return !this.$store.user && this.$route.meta.auth
    },
    is_allowed () {
      return !this.$route.meta.admin || (this.$store.user && this.$store.user.is_admin)
    },
  }
}
</script>
<style lang="scss">
@import '@/vars';

.menu {
  // border-bottom: 1px solid #000;;
  background: #fafaff;
  flex-wrap: nowrap;
  padding: 0 10px 10px;
  place-content: space-evenly;
  // margin-bottom: 10px;
  transition: all .2s;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // background: rgba(255,255,255,.8);
  // z-index: 10;
  div {
    border-bottom: 1px solid #000;
    cursor: pointer;
    flex-grow: 0;
    * {
      font-size: 1.1rem!important;
      letter-spacing: 1px;
      // font-weight: bold;
      // margin: 0 0 0;
    }
    padding: 6px 10px 3px;
    text-align: center;
    transition: all .1s;
    &[selected] {
      border-bottom-color: $primary;
      color: $primary;
    }
  }
}
</style>
