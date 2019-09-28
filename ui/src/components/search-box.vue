<template lang="html">
  <div class="search-box">
    <form @submit.prevent="search">
      <h3 class="mb-2">Your Search</h3>
      <div class="text-left row no-gutters">
        <div class="col">
          Location
          <location-input v-model="form.display_name"
          :lat.sync="form.lat"
          :lon.sync="form.lon"
          :bounding-box.sync="form.bounding_box"
          />
        </div>
        <div class="col-3 pl-3">
          People
          <input v-model="form.n" type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="text-left">
        <!-- <h4>Your Dates:</h4> -->
        <div class="row no-gutters" style="">
          <div class="col-6 pr-2">
            <span>Check in</span>
            <date-picker v-model="form.check_in"
            :lang="$i18n.locale"
            style="width: 100%"
            input-class="form-control"
            :first-day-of-week="1"
            format="DD MMM YYYY"
            :not-before="new Date()"
            :value-type="{
              value2date: v => $utc(v),
              date2value: d => d.toStdLocal(),
              }"/>
          </div>
          <div class="col-6 pl-2">
            <span>Check out</span>
            <date-picker v-model="form.check_out"
            ref="checkout"
            :lang="$i18n.locale"
            style="width: 100%"
            input-class="form-control"
            :first-day-of-week="1"
            format="DD MMM YYYY"
            :not-before="$utc(form.check_in)"
            :value-type="{
              value2date: v => $utc(v),
              date2value: d => d.toStdLocal(),
              }"/>
          </div>
        </div>
      </div>

      <div class="my-2">
        <i v-if="form.lat">&nbsp;</i>
        <i v-else>Select a location from the list</i>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="!is_search_valid">
        Search!
      </button>
    </form>

  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  components: {
    DatePicker,
  },

  data () {
    let last_search = localStorage.last_search && JSON.parse(localStorage.last_search)
    let form = last_search || {}

    if (!form.check_in || form.check_in < ((new Date).toStdLocal())) form.check_in = (new Date).toStdLocal()
    if (!form.n) form.n = 2
    return {
      console,
      form,
    }
  },

  computed: {
    is_search_valid () {
      return this.form.check_in
        && this.form.check_out
        && this.form.lat
        && this.form.lon
        && this.form.n > 0
    },
  },

  methods: {

    beautifyLocation (x) {
      return (x.display_name || '').split(',').slice(0, 2).join(',')
    },

    search () {
      localStorage.setItem('last_search', JSON.stringify(this.form))
      this.$router.push({
        name: 'results',
        query: {
          q: this.$utils.pack(this.form),
        },
      })
    },
  },

  watch: {
    'form.check_in': {
      immediate: true,
      handler (v) {
        if (!this.form.check_out || v >= this.form.check_out) {
          this.$set(this.form, 'check_out', this.$utc(v).nextDay().toStdLocal())
        }
        this.$refs.checkout && this.$refs.checkout.$el.querySelector('input').focus()
        this.$refs.checkout && this.$refs.checkout.showPopup()
      }
    }
  }
}
</script>

<style lang="scss">
.search-box {
  margin: 0 -1rem;
  padding: 1rem 1rem;
  // border-radius: .5rem;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 1.5rem rgba(0,0,0,.2);
}
</style>
