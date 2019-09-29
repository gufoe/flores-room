<template lang="html">
  <div class="location-input">
    <vue-bootstrap-typeahead
      :serializer="beautifyLocation"
      :data="suggestions"
      v-model="query"
      @hit="setLocation($event)"
      ref="loc_search"
    />
    <i style="font-size: .9rem">&nbsp;
      <template v-if="is_loading">Loading...</template>
      <template v-else-if="is_empty">No results</template>
    </i>
  </div>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
export default {
  components: {
    VueBootstrapTypeahead,
  },

  props: {
    value: {
      type: String,
      default: '',
    }
  },

  data () {
    return {
      query: this.value,
      suggestions: [],
      is_loading: false,
      is_empty: false,
      cancel_token: null,
      load_to: null,
      watch: true,
    }
  },


  mounted () {
    this.$refs.loc_search.inputValue = this.query
    this.$nextTick(() => {
      this.watch = true
    })
  },

  methods: {
    beautifyLocation (x) {
      return (x.display_name || '').split(',').slice(0, 2).join(',')
    },

    updateLocSuggestions (query) {
      if (this.load_to) clearTimeout(this.load_to)
      this.load_to = setTimeout(() => {
        if (!query) return
        this.is_loading = true
        let params = {
          format: 'json',
          q: query,
          // osm_type: 'node',
          addressdetails: 0,
          countrycodes: 'id',
        }
        this.cancel_token && this.cancel_token.cancel()
        this.cancel_token = this.$http.CancelToken.source()
        console.log('query location', query)
        this.$http.get('https://nominatim.openstreetmap.org/search', {
          cancelToken: this.cancel_token.token,
          params
        }).then(res => {
          this.suggestions = res.data
          this.is_empty = !res.data.length
        }).finally(() => {this.is_loading = false })
      }, 500)
    },

    setLocation (loc) {
      this.cancel_token && this.cancel_token.cancel()
      if (this.load_to) clearTimeout(this.load_to)
      this.$emit('input', this.beautifyLocation(loc))
      this.$emit('update:lat', loc.lat * 1)
      this.$emit('update:lon', loc.lon * 1)
      this.$emit('update:bounding-box', loc.boundingBox)
      this.watch = false
      this.$nextTick(() => {
        this.watch = true
      })
    },
  },

  watch: {
    query (v) {
      if (!this.watch) return
      this.updateLocSuggestions(v)
    },
  }
}
</script>

<style lang="scss">
.location-input {
  position: relative;
  z-index: 500;
  .input-group input {
    margin: 0 0;
  }
}
</style>
