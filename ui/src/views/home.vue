<template lang="html">
  <div class="text-center m-2">
    <h4 class="m-0">Welcome to</h4>
    <h1 class="m-0">Flores Room</h1>
    <div class="mt-1">Your finest cheapest room</div>

    <div class="my-4">
        <search-box/>
    </div>

    <div v-if="!$store.user">
      <div>
        This project will allow local <b>guesthouses</b> and <b>homestays</b> to receive and manage
        bookings <b>easily</b> and with <b>minimal fees</b>.
      </div>

      <button @click="$router.push({ name: 'account' })" class="btn btn-outline-primary my-3">Sign Up!</button>
    </div>



    <div v-if="$store.user && $store.user.places.length" class="mt-2">
        <button @click="$router.push({ name: 'manage-places' })" class="btn btn-outline-primary">Manage your places!</button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
