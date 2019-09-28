<template lang="html">
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Place</th>
          <th>Host</th>
          <th class="text-center">Active</th>
          <th class="text-center">Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places" :key="place.id">
          <td>
            {{ place.name }}
            <div class="small">
              {{ $d($utc(place.created_at)) }}
            </div>
          </td>
          <td>
            {{ place.user.name }}
            <div class="small">
              {{ $d($utc(place.user.created_at)) }}
            </div>
          </td>
          <td class="text-center">
            <span v-if="place.is_active" class="text-success">yes</span>
            <span v-else class="text-danger">no</span>
          </td>
          <td class="text-center">
            <input type="checkbox" :checked="place.is_verified" @click.prevent="toggleVerified(place)">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      places: null,
    }
  },

  created () {
    this.refreshPlaces()
  },

  methods: {
    refreshPlaces () {
      let params = {
        with_user: true,
        safe_write: true,
        order_by: 'created_at',
        order_desc: true,
      }
      this.$http.get('places', { params }).then(res => {
        this.places = res.data
      })
    },

    toggleVerified (place) {
      this.$http.post(`places/${place.id}/toggle-verified`).then(res => {
        place.is_verified = res.data.is_verified
        if (place.user_id == this.$store.user.id) this.$store.refreshUser()
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>
