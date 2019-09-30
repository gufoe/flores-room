<template lang="html">
  <div v-if="filters" class="page-checkout">
    <div v-if="(private_rooms = place.rooms.filter(p => !p.is_dorm)).length" class="block-primary mb-4">
      <div class="block-title">
        <h4 class="nm">Private Rooms:</h4>
      </div>
      <room v-for="room in private_rooms"
      :key="room.id"
      :room="room"
      :booking="bookings[room.id]"
      :places_left="filters.n - (booking ? booking.spaces : 0)"
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
      :places_left="filters.n - (booking ? booking.spaces : 0)"
      class="block-content"/>
    </div>

    <div class="block-info checkout mb-5">
      <div class="block-title">
        <h3 class="nm">Checkout:</h3>
      </div>
      <div v-if="!$store.user" class="block-content">
        <login :nested="true"/>
      </div>
      <div v-if="false && location.hostname.match(/\.com$/)" class="block-content py-4">
        Checkout has not been implemented yet
      </div>
      <div v-else-if="!booking" class="block-content py-4">
        Select the beds/rooms you want
      </div>
      <template v-else>
        <div style="margin: 0 -1px">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>People:</td>
                <td style="width: 100%">
                  <b>{{ booking.guest_number }}</b>
                </td>
              </tr>
              <tr>
                <td>Nights:</td>
                <td>
                  <b>{{ booking.nights }}</b>
                </td>
              </tr>
              <tr>
                <td style="white-space: pre">Check in:</td>
                <td>
                  <b>{{ $d($utc(booking.check_in), 'date') }}</b>
                </td>
              </tr>
              <tr>
                <td style="white-space: pre">Check out:</td>
                <td>
                  <b>{{ $d($utc(booking.check_out), 'date') }}</b>
                </td>
              </tr>
              <tr>
                <td style="white-space: pre">Price per night:</td>
                <td>
                  <b><price :price="booking.total_per_night"/></b>
                </td>
              </tr>
              <tr>
                <td>Total price:</td>
                <td>
                  <b><price :price="booking.total"/></b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="block-content">
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
      </template>
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
      let spaces = 0
      let total = 0
      let bookings = this.bookings
      for (let rid in bookings) {
        for (let type in bookings[rid]) {
          let num = bookings[rid][type]
          counts[type] = (counts[type] || 0) + num
          let room = this.place.rooms.find(r => r.id == rid)

          if (type == 'room') total+= room.price * num
          else total+= room[`b${type}_price`] * num

          if (type == 'room') spaces+= num * (room.b1_count + room.b2_count*2)
          else spaces+= num * type

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
        spaces,
        guest_number: this.filters.n,
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
