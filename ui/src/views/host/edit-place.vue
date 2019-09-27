<template lang="html">
  <div class="page-place-form mx-2" v-if="form">
    <h1>{{ form.id ? 'Edit' : 'Create' }} Place</h1>
    <form @submit.prevent="save">
      <fieldset class="form-group">
        <legend class="legend">Basic Info</legend>
        <div class="my-form-row">
          Name
          <input v-model="form.name" type="text" class="form-control"/>
        </div>
        <div class="my-form-row">
          Type
          <select v-model="form.type" class="form-control">
            <option v-for="type in $store.place_types" :key="type" :value="type">{{ $t(type) }}</option>
          </select>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <legend class="legend">Address</legend>
        <div class="my-form-row" v-square=".5" style="min-height: 50vh">
          <location-picker
          :city.sync="form.loc_city"
          :addr.sync="form.loc_addr"
          :lat.sync="form.loc_lat"
          :lon.sync="form.loc_lon"
          :with_addr="true"
          @addr="$set(form, 'loc_city', $event.village || $event.city || $event.state); $set(form, 'loc_addr', $event.road)"
          />
        </div>
        <div class="my-form-row mt-1">
          City
          <input v-model="form.loc_city" type="text" class="form-control"/>
        </div>
        <div class="my-form-row">
          Address
          <input v-model="form.loc_addr" type="text" class="form-control"/>
        </div>
      </fieldset>

      <fieldset class="form-group">
        <legend class="legend">Images ({{ form.pics.length }})</legend>
        <div class="my-form-row">
          <div style="width: 100%">
            <swiper v-if="form.pics.length" style="margin: 10px -1rem;" :options="{
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
              <swiper-slide v-for="token in form.pics" :key="token" style="background-color: #222">
                <div :style="'margin: 1rem; background-size: contain; background-position: center center; background-repeat: no-repeat; background-image: url('+$utils.image_md(token)+')'" v-square="9/16">
                  <div class="btn-del">

                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div v-if="uploading_files.length">Uploading {{ uploading_files.length }} files...</div>
            <div class="">
              <button @click="addImages()" type="button" class="btn btn-outline-primary">Add images</button>
            </div>
          </div>
        </div>
      </fieldset>


      <fieldset class="form-group">
        <legend class="legend">Features</legend>
        <div v-for="perk in $store.place_perks" :key="perk" class="my-form-row">
          <label>
            <input type="checkbox" :checked="form.perks.includes(perk)"
            @change="form.perks.includes(perk) ? form.perks.splice(form.perks.indexOf(perk), 1) : form.perks.push(perk)"/>
            {{ $t(`perk.${perk}`) }}
          </label>
        </div>
      </fieldset>
      <div class="text-center" style="margin: 2rem 0 0">
        <button :disabled="is_saving" @click.prevent="$router.back()" class="btn btn-danger" type="button">Back</button>
        &nbsp;
        <button :disabled="is_saving" class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import locationPicker from '@/components/location-picker'

export default {
  components: {
    locationPicker,
  },

  data () {
    return {
      form: null,
      is_saving: false,
      uploading_files: [],
    }
  },

  methods: {
    initForm () {
      let id = this.$route.params.id
      if (!id) {
        this.form = {
          perks: [],
          pics: [],
          images: [],
          loc_city: 'xxx',
          loc_addr: 'xxx',
          loc_lat: 0,
          loc_lon: 0,
        }
      } else {
        this.form = null
        this.$http.get(`places/${id}`).then(res => {
          this.form = res.data
        })
      }
    },

    addImages () {
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = 1
      input.onchange = e => {
        console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
          this.$utils.resizeImage(e.target.files[i], base64 => {
            let fd = {
              uploaded: 0,
              size: base64.length,
            }
            this.uploading_files.push(fd)
            this.$http.post('files/image', { base64 }).then(res => {
              this.form.pics.push(res.data)
            }).finally(() => {
              let i = this.uploading_files.indexOf(fd)
              console.log('removing', i, fd)
              this.uploading_files.splice(i, 1)
            })
          })
        }
      }
      input.click()
    },

    save () {
      this.is_saving = true
      this.$http.post(`places`, this.form).then(res => {
        // this.form = res.data
        if (!this.form.id) {
          this.$store.user.places.push(res.data)
        }
        this.$router.push({ name: 'manage-place', params: { id: res.data.id } })
      }).finally(() => { this.is_saving = false })
    }
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler () {
        this.initForm()
      }
    }
  }
}
</script>

<style lang="scss">
.page-place-form {

}
</style>
