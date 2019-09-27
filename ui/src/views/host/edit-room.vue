<template lang="html">
  <div>
    <h3>{{ form.id ? 'Edit' : 'Create' }} Room</h3>

    <form @submit.prevent.stop="save()">
      <div class="form-section">
        <h3 class="text-center">
          Info
        </h3>
        <div class="my-form-row">
          Name
          <input v-model="form.name" type="text" class="form-control">
        </div>
        <div class="my-form-row">
          <label>
            <input type="checkbox" v-model="form.is_dorm"/>
            This room is a dorm
          </label>
        </div>
        <transition name="fade">
          <div v-if="form.is_dorm" class="my-form-row">
            <label>
              <input type="checkbox" v-model="form.is_female_only"/>
              Exclusive for females
            </label>
          </div>
        </transition>
      </div>

      <div class="form-section">
        <h2 class="text-center">
          Features
        </h2>
        <div v-for="perk in $store.room_perks" :key="perk" class="my-form-row">
          <label>
            <input type="checkbox" :checked="form.perks.includes(perk)"
            @change="form.perks.includes(perk) ? form.perks.splice(form.perks.indexOf(perk), 1) : form.perks.push(perk)"/>
            {{ $t(`room-perk.${perk}`) }}
          </label>
        </div>
      </div>

      <div v-if="!form.is_dorm" class="form-section text-center">
        <h2>
          Price
        </h2>

        <price-input v-model="form.price" class="form-control"/>
      </div>

      <div class="form-section">
        <h2 class="text-center">
          Beds
        </h2>
        <div class="row text-center">
          <div class="col-6">
            Bed
          </div>
          <div class="col-6">
            Bunk bed
          </div>
          <div v-for="type in $store.bed_types" :key="type" class="col-3 lh-2 text-center" style="justify-content: bottom;">
            {{ $t(`bed-type.${type}`.replace('-bunk', '')) }}
            <br>
            <input v-model="form.shape[type]" type="number" step="1" min="0" class="form-control text-center" style="width: 3rem; margin: 0 auto .5rem"/>
          </div>
        </div>
      </div>

      <div v-if="form.is_dorm" class="form-section">
        <h2 class="text-center">
          Bed Prices
        </h2>
        <div class="row">
          <div v-for="s in [1, 2]" :key="s" class="col text-center lh-2">
            {{ $t(`bed-price.${s}`) }}
            <br>
            <price-input v-model="form[`b${s}_price`]"/>
          </div>
        </div>
      </div>

      <div class="text-center" style="margin: 2rem 0 0">
        <button :disabled="is_saving" @click.prevent="$router.back()" class="btn btn-danger" type="button">Back</button>
        &nbsp;
        <button :disabled="is_saving" class="btn btn-primary" type="submit">Save</button>
      </div>
      <pre>{{ form }}</pre>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      form: null,
      is_saving: false,
      original: null,
    }
  },

  methods: {
    save () {
      this.is_saving = true
      console.log('saving')
      this.$http.post(`rooms`, this.form).then(res => {
        if (this.original) Object.assign(this.original, res.data)
        else this.place.rooms.push(res.data)
        this.$router.back()
        this.$router.replace({ name: 'manage-rooms', params: { id: this.$route.params.id }})
      }).finally(() => { this.is_saving = false })
    },
  },

  watch: {
    '$route.params.room_id': {
      immediate: true,
      handler (v) {
        console.log('room_id changed')
        let room = null
        if (v) {
          room = this.place.rooms.find(r => r.id == v)
          if (room) {
            this.original = room
          } else {
            return this.$router.back()
          }
        }

        this.form = this.$utils.clone(room) || {
          place_id: this.place.id,
          shape: {},
          perks: [],
        }
      }
    }
  }


}
</script>

<style lang="scss">
.form-section {
  margin: 0 0 3rem;
}
</style>
