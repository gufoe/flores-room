<template lang="html">
  <div class="my-3 mx-2">
    <div v-if="!booking" class="block-info">
      <div class="block-title">
        <h3 class="nm">Your Bookings</h3>
      </div>
      <div v-if="!bookings" class="block-content">
        Loading...
      </div>
      <div v-else-if="!bookings.length" class="block-content">
        You have no bookings yet
      </div>
      <div v-for="booking in bookings" class="block-content">
        <div class="row">
          <div class="col">
            <h5 class="nm text-info">{{ booking.place.name }}</h5>
            <div class="small">
              {{ booking.place.loc_city }}
              -
              <price :price="booking.price" :extended="true"/>
              -
              <span v-if="booking.is_canceled" class="text-danger">canceled</span>
              <span v-else class="text-info">active</span>
            </div>
            <div class="small">
              {{ booking.nights}} night:
              {{ $d($utc(booking.check_in), 'date') }}
              -
              {{ $d($utc(booking.check_out), 'date') }}
            </div>
          </div>
          <button class="btn btn-info mx-2 px-3"
          style="font-weight:bold; border-width: 2px"
          @click="$router.push({ name: 'booking', params: { id: booking.id }})">
            View
          </button>
        </div>
      </div>
    </div>
    <booking v-else :booking="booking"/>
  </div>
</template>

<script>
import booking from '@/components/booking'

export default {
  components: {
    booking,
  },

  data () {
    return {
      bookings: null,
    }
  },

  computed: {
    booking () {
      let id = this.$route.params.id
      if (!id || !this.bookings) return null
      let b = this.bookings.find(b => b.id == id)
      if (!b) this.$router.replace({ name: 'bookings' })
      else return b
    }
  },

  created () {
    this.refreshUsers()
  },

  methods: {
    refreshUsers () {
      let params = {
      }
      this.$http.get('user/bookings', { params }).then(res => {
        this.bookings = res.data
      })
    },
  }
}
</script>

<style lang="css">
</style>
