<template lang="html">
  <loading-screen v-if="!place">
    Loading...
  </loading-screen>
  <div v-else class="page-manage-place">
    <div class="text-center">
      <h1 @click="$router.push({name:'manage-place'})">{{ place.name }}</h1>
    </div>
    <router-view v-if="$route.name != 'manage-place'" :place="place"/>
    <div v-else>
      <div class="text-center">
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
      </div>

      <div class="host-bookings my-5">
        <div class="text-center">
          <h2>Bookings</h2>
          You have {{ place.bookings.length }} bookings so far.
        </div>
        <table class="table">
          <tbody>
            <template v-for="(booking, booking_i) in place.bookings">
              <template v-if="!booking_i || booking.check_in != place.bookings[booking_i-1].check_in">
                <tr :key="'day-'+booking.id" class="day">
                  <td colspan=3>
                    <div>
                      {{ $d($utc(booking.check_in), 'datelong') }}
                    </div>
                  </td>
                </tr>
                <tr :key="'head-'+booking.id" class="head">
                  <td> Main guest </td>
                  <td class="text-center"> People </td>
                  <td class="text-right"> Check out </td>
                </tr>
              </template>
              <tr :key="booking.id" @click="$set(expanded, booking.id, !expanded[booking.id])" :class="{booking:1, expanded:expanded[booking.id]}">
                <td>
                  {{ booking.user.name }}
                </td>
                <td class="text-center">
                  {{ booking.guest_number }}
                </td>
                <td class="text-right">
                  {{ $d($utc(booking.check_out), 'date') }}
                </td>
              </tr>
              <tr :key="'detail'+booking.id" v-if="expanded[booking.id]" @click="$delete(expanded, booking.id)" class="detail">
                <td colspan=3>
                  Code: <b class="select">{{ booking.code }}</b>
                  <br>
                  Booking date: <b>{{ $d($utc(booking.created_at), 'datetime') }}</b>
                  <br>
                  Nights: <b>{{ booking.guest_number }}</b>

                  <br>
                  <div class="units">
                    <div v-for="unit in booking.units" :key="unit.id" v-if="room = unit.room" class="unit">
                      <b>{{ room.name }}</b>
                      <div v-if="room.is_dorm">
                        <div v-if="unit.b1_count">
                          {{ unit.b1_count }} {{ $t('bed_type.single') }} bed
                        </div>
                        <div v-if="unit.b2_count">
                          {{ unit.b2_count }} {{ $t('bed_type.double') }} bed
                        </div>
                      </div>
                      <div v-else>
                        Full private room
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      place: null,
      expanded: {},
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
@import '@/vars';

.page-place-place {
}

.host-bookings {
  .day {
    font-weight: bold;
    padding: 1rem 0;
    font-size: 1.1rem;
    text-align: center;
    &:first-child {
      td {
      }
    }

    td  {
      border: none;
      padding: 2rem 2rem 1rem;
      div {
        background: #fff;
        box-shadow: 0 0 1rem rgba(0,0,0,.2);
        padding: .5rem 0;
        border: 2px solid $primary;
        color: $primary;
        border-radius: 4px;
      }
    }
  }
  .head {
    font-weight: bold;
    td {
      border: none;
    }
  }
  .booking {
    &:hover, &.expanded {
      background: #f0f2f4;
      cursor: pointer;
    }
  }
  .detail {
    cursor: pointer;
    td {
      padding-top: 0;
      background: #f0f2f4;
      border: none;

      .unit {
        margin: 1rem 0;
        border-left: 3px solid $primary;
        padding-left: .8rem;
      }
    }
  }
}
</style>
