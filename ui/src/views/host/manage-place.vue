<template lang="html">
  <div class="page-manage-place mx-2">
    <loading-screen v-if="!place">
      Loading data...
    </loading-screen>
    <div v-else>
      <h1 @click="$router.push({name:'manage-place'})">{{ place.name }}</h1>
      <router-view v-if="$route.name != 'manage-place'" :place="place"/>
      <div v-else class="mt-3">
        <div class="lh-2 my-3">
          {{ $t(`place_type.${place.type}`) }}
          -
          <span v-if="place.is_active" class="text-success">active</span>
          <span v-else class="text-danger">suspended</span>
          -
          {{ place.rooms.filter(r => r.is_active).length }} rooms
        </div>
        <div class="lh-2 my-3">
          <button @click="$router.push({ name: 'edit-place', params: { id: place.id }})" class="btn btn-outline-success">Edit Info</button>
          &nbsp;
          <button @click="$router.push({ name: 'manage-rooms', params: { id: place.id }})" class="btn btn-outline-info">Edit Rooms</button>
          &nbsp;
          <button @click="toggleActive" class="btn btn-outline-warning">{{ place.is_active ? 'Suspend' : 'Activate' }}</button>
        </div>
        <div class="my-3 text-danger" v-if="!place.is_verified">
          This place has not been verified. Please contact us to verify this place.
        </div>

        <div class="mt-4">
          <h3>Bookings</h3>
          You have {{ place.bookings.length }} bookings so far.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      place: null,
    }
  },

  created() {
    console.log('created', this.$route.name)
  },

  methods: {
    loadPlace () {
      let id = this.$route.params.id
      let params = {
        with_bookings: true,
        safe_write: true,
      }
      this.place = null
      this.$http.get(`places/${id}`, { params }).then(res => {
        this.place = res.data
      })
    },

    toggleActive () {
      this.$http.post(`places/${this.place.id}/toggle-active`).then(res => {
        this.place.is_active = res.data.is_active
        if (this.place.user_id == this.$store.user.id) this.$store.refreshUser()
        document.body.focus()
        document.body.trigger('click')
      })
    },
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler (n, o) {
        if (n != o) this.loadPlace()
      }
    }
  }
}
</script>

<style lang="scss">
.page-place-place {

}
</style>
