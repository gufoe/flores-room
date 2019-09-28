<template lang="html">
  <div class="page-padded">
    <div class="mb-4">
      Name: <b>{{ $store.user.name }}</b>
      <br>
      Login method: <b>{{ $store.user.auth_driver }}</b>
    </div>

    <div class="mb-4">
      Do you want to host your place?
      <br>
      <a href="#" @click.prevent="$router.push({ name: 'manage-places' })">Click here!</a>
    </div>

    <div class="mb-4">
      Flores Room version <code>{{ version }}</code>
    </div>

    <button class="btn btn-outline-danger mb-5" @click="$store.logout()">Logout</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: this.$utils.hash(document.head.innerHTML)
    }
  }
}
</script>

<style lang="css">
</style>
