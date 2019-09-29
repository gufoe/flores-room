<template lang="html">
  <div class="block-info">
    <div class="block-title">
      <h3 class="nm">
        Booking details
      </h3>
    </div>
    <div class="block-content">
      <div class="my-3">
        <h4 class="text-info">{{ booking.place.name }}</h4>
      </div>
      <div class="mb-3">
        <div>
          <span class="bold mr-2">Booking code:</span>
          <span class="select">{{ booking.code }}</span>
        </div>
        <div>
          <span class="bold mr-2">Total price:</span>
          <price :price="booking.price" :extended="true"/>
        </div>
        <div>
          <span class="bold mr-2">Status:</span>
          <span v-if="booking.is_refunded" class="text-danger">refunded</span>
          <span v-else class="text-info">paid</span>
        </div>
      </div>
      <div class="mb-3">
        <span class="bold mr-2">Total nights:</span>
        {{ booking.nights }}
        <br>
        <span class="bold mr-2">Check in:</span>
        {{ $d($utc(booking.check_in), 'date') }}
        <br>
        <span class="bold mr-2">Check out:</span>
        {{ $d($utc(booking.check_out), 'date') }}
      </div>
      <div class="mb-3">
        <div>
          <span class="bold mr-2">Location:</span>
          <span class="select">{{ booking.place.loc_city }}</span>
        </div>
        <div>
          <span class="bold mr-2">Address:</span>
          <span class="select">{{ booking.place.loc_addr }}</span>
        </div>
      </div>
      <div class="mb-3">
        <button v-if="!show_map" @click="show_map = true" class="btn btn-outline-info">
          Show map
        </button>
        <button v-else @click="show_map = false" class="btn btn-info">
          Hide map
        </button>
        &nbsp;
        <button @click="$router.push({ name: 'bookings' })" class="btn btn-outline-info">
          Your bookings
        </button>
      </div>
      <location v-if="show_map" :readonly="true"
      :lat="booking.place.loc_lat"
      :lon="booking.place.loc_lon"
       style="height: 60vh"/>
    </div>
  </div>
</template>

<script>
import location from '@/components/location-picker'
export default {
  components: {
    location,
  },

  props: {
    booking: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      show_map: false,
    }
  },
}
</script>

<style lang="scss">

</style>
