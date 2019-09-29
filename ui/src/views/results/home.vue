<template lang="html">
  <loading-screen v-if="!places">
    <div v-if="is_error">
      Cannot load results
      <br>
      <br>
      <button class="btn btn-outline-warning" @click="reloadResults">Try again</button>
    </div>
    <div v-else>
      Loading places...
    </div>
  </loading-screen>
  <div v-else-if="$route.name == 'view-result'">
    <div v-if="!selected_place" class="p-5 text-center">
      This place is not available anymore
      <br>
      <br>
      <button @click="$router.back()" class="btn btn-outline-danger">Go Back</button>
    </div>
    <view-place v-else :src_place="selected_place" :src_filters="filters"/>
  </div>
  <div v-else class="page-places">
    <div class="page-padded">
      <h1 class="mt-3 mb-2">Results</h1>
      <div v-if="!places">
        Loading... 🧐
      </div>
      <div v-else-if="places.length">
        {{ places.length }} places found
        🙂
      </div>
      <div v-else>
        No places found 🥺
      </div>
      <a href="#" @click.prevent="$router.push({ name: 'home' })">Change search</a>
    </div>
    <div v-for="place in places"
    @click="$router.push({ name: 'view-result', params: { id: place.id }, query: $route.query })"
    class="result row">
      <div class="col-5 res-pic"
      v-square
      :style="place.pics.length && 'background-image: url('+$utils.image_md(place.pics[0])+')'">
      </div>
      <div class="col res-info">
        <div style="font-size: 1.1rem">{{ place.name }}</div>
        <div class="small" style="opacity: .7">
          {{ place.loc_city }},
          {{ (place.distance || Math.random() * 5).toFixed(1) }} km</span>
          <div>Availability: {{ place.rooms.reduce((a, r) => a+r.availability, 0) }} places</div>
          <br>
          <!-- {{ place.rooms.map(r => r.availability).join(', ') }} -->
        </div>
      </div>
      <b class="res-price">{{ 90+Math.floor(Math.random()* 60) }}<span style="font-size: 70%">.000 ₹</span></b>
    </div>
  </div>
</template>

<script>
import ViewPlace from './view-place'

export default {
  components: {
    ViewPlace,
  },

  data () {
    return {
      places: null,
      is_error: false,
    }
  },

  computed: {
    filters () {
      return this.$utils.unpack(this.$route.query.q)
    },

    selected_place () {
      let id = this.$route.params.id
      if (!id) return null
      return (this.places || []).find(p => p.id == id)
    },
  },

  methods: {
    reloadResults () {
      this.places = null
      let q = this.filters
      let params = {
        distance_from: {
          lat: q.lat,
          lon: q.lon,
        },
        availability: {
          n: q.n,
          check_in: q.check_in,
          check_out: q.check_out,
        },
        order_by: 'distance',
      }

      this.is_error = false
      this.$http.get('places', { params }).then(res => {
        this.places = res.data
      }, err => {
        if (err.response && err.response.status == 400) {
          this.$router.push({ name: 'home' })
        } else {
          this.is_error = true
        }
      })
    },
  },

  watch: {
    filters: {
      immediate: true,
      handler (v, o) {
        if (o && JSON.stringify(v) == JSON.stringify(o)) return
        this.reloadResults()
      }
    },
  },
}
</script>

<style lang="scss">
.page-places {
  .result {
    position: relative;
    margin:  .5rem 0 1.3rem;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 1.5rem rgba(0,0,0,.15);
    border-width: 1px 0;
    // background: #f6f6f8;
    align-items: center;

    .res-pic {
      background-size: cover;
      background-position: center;
      border-right: 1px solid #ddd;
    }
    .res-info {
      height: 100%;
      flex-grow: 1;
      padding-bottom: .7rem;
    }
    .res-price {
      position: absolute;
      right: 1rem;
      bottom: .5rem;
    }
    .res-dist {
      position: absolute;
      right: 1rem;
      top: .5rem;
      color: #888;
      font-size: .9rem;
    }
  }
}
</style>
