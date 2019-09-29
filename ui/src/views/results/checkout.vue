<template lang="html">
  <div v-if="filters" class="page-checkout">
    <!-- <div class="book-header">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="m-0">Booking</h3>
        </div>
        <div class="col text-center">
          {{ filters.n }} people
        </div>
        <div class="col text-center">
          {{ $d($utc(filters.check_in)) }}
          <br>
          {{ $d($utc(filters.check_out)) }}
        </div>
      </div>
    </div> -->

    <div v-if="(private_rooms = place.rooms.filter(p => !p.is_dorm)).length" class="block-primary mb-4">
      <div class="block-title">
        <h4 class="nm">Private Rooms:</h4>
      </div>
      <room v-for="room in private_rooms"
      :key="room.id"
      :room="room"
      :booking="bookings[room.id]"
      :places_left="filters.n - (booking ? booking.people : 0)"
      class="block-content"/>
    </div>

    <div v-if="(dorms = place.rooms.filter(p => p.is_dorm)).length" class="block-primary mb-4">
      <div class="block-title">
        <h4 class="nm">Dorms:</h4>
      </div>
      <room v-for="room in dorms"
      :key="room.id"
      :room="room"
      :booking="bookings[room.id]"
      :places_left="filters.n - (booking ? booking.people : 0)"
      class="block-content"/>
    </div>

    <div class="block-info checkout mb-5">
      <div class="block-title">
        <h3 class="nm">Checkout:</h3>
      </div>
      <div v-if="!$store.user" class="block-content">
        <login :nested="true"/>
      </div>
      <div v-else class="block-content">
        <div v-if="location.hostname.match(/\.com$/)" class="py-4">
          Checkout has not been implemented yet
        </div>
        <div v-else-if="!booking" class="py-4">
          Select the beds/rooms you want
        </div>
        <div v-else>
          <div class="row mb-2">
            <div class="col">
              Price per night: <b><price :price="booking.total_per_night"/></b>
              <br>
              Check in: <b>{{ $d($utc(booking.check_in), 'date') }}</b>
              <br>
              Check out: <b>{{ $d($utc(booking.check_out), 'date') }}</b>
              <br>
              Nights: <b>{{ booking.nights }}</b>
              <br>
              Total price: <b><price :price="booking.total"/></b>
            </div>
            <div class="col">
              People: <b>{{ filters.n }}</b>
              <br>
              <span :class="booking.people > filters.n && 'text-danger'">Spaces: {{ booking.people }}</span>
              <br>
            </div>
          </div>

          <div class="my-4">
            Payment method:
            <select class="form-control">
              <optgroup label="Saved cards">
                <option>Mastercard *0984</option>
                <option>Visa *3283</option>
              </optgroup>
              <optgroup label="New Method">
                <option>Credit Card</option>
                <option>Paypal</option>
              </optgroup>
            </select>
          </div>

          <div class="text-right">
            <button class="btn btn-info" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import login from '@/views/login'
import room from './room'
export default {
  components: {
    login,
    room,
  },

  props: {
    place: {
      type: Object,
    },
    filters: {
      type: Object,
    },
  },

  data () {
    return {
      bookings: null,
      location,
    }
  },

  created () {

  },

  computed: {
    booking () {
      let counts = {}
      let nights = (this.$utc(this.filters.check_out).getTime() - this.$utc(this.filters.check_in).getTime())/86400000
      let people = 0
      let total = 0
      let bookings = this.bookings
      for (let rid in bookings) {
        for (let type in bookings[rid]) {
          let num = bookings[rid][type]
          counts[type] = (counts[type] || 0) + num
          let room = this.place.rooms.find(r => r.id == rid)

          if (type == 'room') total+= room.price * num
          else total+= room[`b${type}_price`] * num

          if (type == 'room') people+= num * (room.b1_count + room.b2_count*2)
          else people+= num * type

        }
      }
      if (!total) return
      let total_per_night = total
      total*= nights

      return {
        place_id: this.place.id,
        check_in: this.filters.check_in,
        check_out: this.filters.check_out,
        counts,
        people,
        total_per_night,
        total,
        nights,
        bookings,
      }
    }
  },

  methods: {
    checkout () {
      this.$http.post('bookings', this.booking).then(res => {
        this.$router.push({ name: 'booking', params: { id: res.data.id } })
      })
    },
  },


  watch: {
    src_place (v) {
      this.place = v
    },
    'place.rooms': {
      immediate: true,
      handler (v) {
        let books = {}
        v.forEach(r => books[r.id] = { 1: 0, 2: 0, room: 0 })
        this.bookings = books
      },
    },
  }
}
</script>

<style lang="scss">
@import '@/vars';

.page-checkout {
  .book-header {
    background: #fff;
    border: 1px solid #ddd;
    padding: 1rem .4rem;
    overflow: hidden;
    box-shadow: 0 0 1rem rgba(0,0,0,.2);
  }

}
</style>
