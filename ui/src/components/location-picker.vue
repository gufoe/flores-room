<template lang="html">
  <div style="height: 100%; width: 100%; display: flex; flex-direction: column" v-if="is_ready">
    <div v-if="!readonly" class="small mt-2">
      Search the name of the city and then click on the address
    </div>
    <div class="full-height">
      <l-map :zoom="16" @click="mapClick" ref="map">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png">
        </l-tile-layer>
        <!-- <l-layer-group> -->
          <l-marker v-if="lat && lon"
          :lat-lng="{lat, lng:lon}"
          />
        <!-- </l-layer-group> -->
        <l-geosearch v-if="!readonly" ref="geosearch" :options="geosearch_options" ></l-geosearch>
      </l-map>
    </div>
  </div>
</template>

<script>

import {
  LMap,
  LTileLayer,
  // LLayerGroup,
  LMarker,
} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import LGeosearch from 'vue2-leaflet-geosearch'
import 'leaflet-geosearch/assets/css/leaflet.css'

import { OpenStreetMapProvider } from 'leaflet-geosearch'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  components: {
    LMap,
    LTileLayer,
    // LLayerGroup,
    LMarker,
    LGeosearch,
  },

  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Number,
      required: false,
    },
    lon: {
      type: Number,
      required: false,
    },
    with_addr: {
      type: Boolean,
      default: true
    },
  },

  data () {
    return {
      console,
      geosearch_options: {
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        showPopup: false,
        showMarker: false,
        keepResult: true,
        autoClose: true,
        searchLabel: 'Search location...',
      },
      // marker: null,
      is_ready: false,
    }
  },

  mounted () {
    setTimeout(() => {
      this.is_ready = true
      this.$nextTick(() => {
        let pos = [ this.lat, this.lon ]
        // this.marker = LMarker(pos).addTo(this.map)
        this.map.setView(pos, 18)

        // Bugfix: stop bar click propagation
        let el = this.$refs.map.$el.querySelector('.leaflet-control-geosearch.bar form')
        if (el) el.addEventListener('click', e => e.stopPropagation())
      })
    }, 100)
  },

  computed: {
    map () {
      return this.$refs.map && this.$refs.map.mapObject
    }
  },

  methods: {
    mapClick (loc) {
      if (this.readonly) return
      window.x = this.map
      // if (this.marker) {
      //   this.marker.remove()
      // }
      // let marker = this.marker = LMarker(loc.latlng).addTo(this.map)
      this.$emit('update:lat', loc.latlng.lat)
      this.$emit('update:lon', loc.latlng.lng)

      this.map.setView(loc.latlng, 18)

      if (!this.with_addr) return

      this.$http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latlng.lat}&lon=${loc.latlng.lng}`).then(res => {
        // if (marker != this.marker) return
        if (res.data.error) {
          // marker.remove()
        } else {
          console.log('emitting', res.data.address)
          this.$emit('addr', res.data.address)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.leaflet-control-geosearch.bar {
  max-width: 60%;
}
</style>
