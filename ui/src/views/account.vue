<template lang="html">
  <div class="my-3 mx-2">
    <div class="block-primary mb-3">
      <div class="block-title">
        <h3 class="nm">Your Account</h3>
      </div>
      <div class="block-content">
        <div class="mb-3">
          Name: <b>{{ $store.user.name }}</b>
          <br>
          Login method: <b>{{ $store.user.auth_driver }}</b>
        </div>

        <div class="mb-3">
          Flores Room version <code>{{ $store.ui_version }}</code>
        </div>

        <div class="mb-3">
          <button class="btn btn-outline-info" @click="$router.push({ name: 'bookings' })">
            Your bookings
          </button>
          &nbsp;
          <button class="btn btn-outline-primary" @click="$router.push({ name: 'manage-places' })">
            Become a host
          </button>
          &nbsp;
          <button class="btn btn-outline-danger" @click="$store.logout()">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return { }
  }
}
</script>

<style lang="css">
</style>
