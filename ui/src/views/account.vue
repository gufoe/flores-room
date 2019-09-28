<template lang="html">
  <div class="page-padded">
    <div>Name: <b>{{ $store.user.name }}</b></div>
    <div>Login method: <b>{{ $store.user.auth_driver }}</b></div>
    <br>

    <div>
      Do you want to host your place?
      <br>
      <a href="#" @click.prevent="$router.push({ name: 'manage-places' })">Click here!</a>
    </div>

    <button class="btn btn-outline-danger my-5" @click="$store.logout()">Logout</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
