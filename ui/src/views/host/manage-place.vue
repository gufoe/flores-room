<template lang="html">
  <div class="page-manage-place page-padded">
    <div v-if="place">
      <h1>{{ place.name }}</h1>
      <router-view v-if="$route.name != 'manage-place'" :place="place"/>
      <div v-else class="mt-3">
        <div class="lh-2">
          You can click
          <router-link :to="{ name: 'edit-place', params: { id: place.id }}">here</router-link>
          to edit the information, and
          <router-link :to="{ name: 'manage-rooms', params: { id: place.id }}">here</router-link>
          to manage your rooms.
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
      }
      this.place = null
      this.$http.get(`places/${id}`, { params }).then(res => {
        this.place = res.data
      })
    }
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
