<template lang="html">
  <div class="page-admin">
    <h1 class="mx-2">Admin</h1>

    <h4 class="mx-2 mt-4">Place List</h4>
    <place-list/>

    <h4 class="mx-2 mt-4">User List</h4>
    <user-list/>


  </div>
</template>

<script>
import PlaceList from './places'
import UserList from './users'
export default {
  components: {
    PlaceList,
    UserList,
  },

}
</script>

<style lang="css" scoped>
</style>
