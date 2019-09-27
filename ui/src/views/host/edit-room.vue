<template lang="html">
  <div>
    <h3>{{ form.id ? 'Edit' : 'Create' }} Room</h3>

    <form @submit.prevent.stop="save()">
      <fieldset class="form-group">
        <legend class="legend">Basic Info</legend>
        <div class="my-form-row">
          Name
          <input v-model="form.name" type="text" class="form-control">
        </div>
        <div class="my-form-row">
          Type
          <select v-model="form.is_dorm" class="form-control">
            <option :value="false">{{ $t(`room_type.private`) }}</option>
            <option :value="true">{{ $t(`room_type.dorm`) }}</option>
          </select>
        </div>
        <div class="my-form-row">
          <label class="ml-5">
            <input type="checkbox" v-model="form.is_active">
            This room is active
          </label>
        </div>
        <transition name="fade">
          <div v-if="form.is_dorm" class="my-form-row">
            <label class="ml-5">
              <input type="checkbox" v-model="form.is_female_only"/>
              Exclusive for females
            </label>
          </div>
        </transition>
      </fieldset>

      <fieldset class="form-group">
        <legend class="legend">Features</legend>
        <div v-for="perk in $store.room_perks" :key="perk" class="my-form-row">
          <label>
            <input type="checkbox" :checked="form.perks.includes(perk)"
            @change="form.perks.includes(perk) ? form.perks.splice(form.perks.indexOf(perk), 1) : form.perks.push(perk)"/>
            {{ $t(`room_perk.${perk}`) }}
          </label>
        </div>
      </fieldset>

      <fieldset v-if="!form.is_dorm" class="form-group">
        <legend class="legend">Price</legend>

        <div class="row no-gutters mb-3 align-center">
          <div class="col-5 text-right">Price per night:</div>
          <div class="col">
            <price-input v-model="form.price"/>
          </div>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <legend class="legend">Beds</legend>
        <div class="row text-center gutters-1">
          <div class="col-6">
            Bed
          </div>
          <div class="col-6">
            Bunk bed
          </div>
          <div v-for="type in $store.bed_types" :key="type" class="col-3 lh-2 text-center" style="justify-content: bottom;">
            <div style="line-height:1.2">
              {{ $t(`bed_type.${type}`.replace('-bunk', '')) }}
            </div>
            <div class="input-group mt-1">
              <div class="input-group-prepend">
                <span class="input-group-text px-1 py-0">
                  <i :class="`bed ${type}`" style="font-size: 1.8rem"></i>
                </span>
              </div>
              <input v-model="form.shape[type]"
              type="number" step="1" min="0"
              class="form-control text-center"
              style="width: 1rem; margin: 0 auto"/>
            </div>
          </div>
        </div>
        <div class="text-center mt-2">
          Total places: {{ form_places }}
        </div>
      </fieldset>

      <fieldset class="form-group" v-if="form.is_dorm">
        <legend class="legend">Prices</legend>
        <div class="row">
          <div v-for="s in [1, 2]" :key="s" class="col text-center lh-2">
            {{ $t(`bed_price.${s}`) }}
            <br>
            <price-input v-model="form[`b${s}_price`]"/>
          </div>
        </div>
      </fieldset>

      <div class="text-center my-3">
        <button :disabled="is_saving" @click.prevent="$router.back()" class="btn btn-danger" type="button">Back</button>
        &nbsp;
        <button :disabled="is_saving" class="btn btn-primary" type="submit">Save</button>
      </div>
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

  computed: {
    form_places () {
      return (this.form.shape.single || 0) * 1
          + (this.form.shape.double || 0) * 2
          + (this.form.shape['single-bunk'] || 0) * 2
          + (this.form.shape['double-bunk'] || 0) * 4
    }
  },

  methods: {
    save () {
      this.is_saving = true
      console.log('saving')
      this.$http.post(`rooms`, this.form).then(res => {
        if (this.place.user_id == this.$store.user.id) this.$store.refreshUser()
        if (this.original) Object.assign(this.original, res.data)
        else this.place.rooms.push(res.data)
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
