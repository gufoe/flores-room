<template lang="html">
  <loading-screen v-if="!place">
    Loading details...
  </loading-screen>
  <div v-else class="page-view-place">
    <div class="page-padded">
      <h2>{{ place.name }}</h2>
      <div class="place-info">
        {{ place.loc_addr }} - {{ place.loc_city }}
        <span v-if="'distance' in place">- {{ place.distance.toFixed(1) }} km from you</span>
      </div>
    </div>
    <swiper v-if="place.pics.length" style="background: #222" :options="{
        slidesPerView: 1,
        /* effect: 'coverflow', */
        /* freeMode: true, */
        spaceBetween: 0,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }">
      <swiper-slide v-for="token in place.pics" :key="token">
        <div :style="'margin: .5rem; background-size: contain; background-position: center center; background-repeat: no-repeat; background-image: url('+$utils.image_md(token)+')'" v-square="11/16">

        </div>
      </swiper-slide>
      <template v-if="place.pics.length > 1">
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </template>
    </swiper>
    <div class="page-padded">
      <div v-if="place.perks.length" class="mb-4">
        <h3>Features</h3>
        <div v-for="perk in place.perks">
          ✓ {{ $t(`perk.${perk}`) }}
        </div>
      </div>
    </div>

    <div v-if="filters" class="book">
      <div class="book-header">
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
      </div>
      <div v-if="dorms = place.rooms.filter(p => p.is_dorm)">
        <div v-for="room in dorms" class="book-room">
          <div class="row no-gutters">
            <div class="col-5">
              <div>{{ room.name }}</div>
              <div class="room-shape small">
                <div v-for="(size, type) in room.shape">
                  {{ type }}:
                  {{ size }}
                </div>
              </div>
              <div v-for="perk in room.perks" class="perk small">
                ✓ {{ $t(`room-perk.${perk}`) }}
              </div>

            </div>
            <div v-for="size in [1,2]"
            v-if="(beds = room[`av_b${size}`]) && (price = room[`b${size}_price`])"
            class="col text-center ml-1">
              <div>
                <span class="small">
                  <price :price="price"/>
                </span>
                <div class="small">max {{ beds }} beds</div>
                <div>
                  <input
                  :value="bookings[room.id][size]"
                  @input="bookings[room.id][size] = $event.target.value*1"
                  class="custom-range" type="range"
                  :min="0" :max="Math.min(beds, filters.n)"
                  style="width: 100%"/>
                </div>
                <div v-if="(br = bookings[room.id]) && br[size]">
                  {{ br[size] }}<span class="small">x</span> =
                  <b><price :price="br[size] * room[`b${size}_price`]"/></b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout">
        <h2>Checkout</h2>
        <div v-if="!booking">
          Select the beds/rooms you want
        </div>
        <div v-else>
          <div class="row mb-2">
            <div class="col">
              Total price: <b><price :price="booking.total"/></b>
            </div>
            <div class="col">
              People: {{ booking.people }}
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
            <button class="btn btn-primary" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src_place: {
      type: Object,
    },
    src_filters: {
      type: Object,
    },
  },

  data () {
    return {
      place: this.src_place,
      filters: this.src_filters,
      bookings: null,
    }
  },

  created () {

  },

  computed: {
    booking () {
      let counts = {}
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
      return {
        place_id: this.place.id,
        check_in: this.filters.check_in,
        check_out: this.filters.check_out,
        total,
        counts,
        people,
        bookings,
      }
    }
  },

  methods: {
    checkout () {
      this.$http.post('bookings', this.booking).then(res => {
        console.log('Fatto!', res)
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
.page-view-place {
  .place-info {
    opacity: .7;
  }

  .book {
    .book-header {
      background: #fff;
      border: 1px solid #ddd;
      border-width: 1px 0;
      padding: 1rem .4rem;
      overflow: hidden;
    }
    .book-room {
      padding: 1rem .4rem;
      border: 1px solid #ddd;
      border-width: 0 0 1px;
      overflow: hidden;
      .perk {
        font-size: .9rem;
        opacity: .6;
      }
    }
  }

  .checkout {
    padding: 3rem 1rem;
    background: #fff;
  }
}
</style>
