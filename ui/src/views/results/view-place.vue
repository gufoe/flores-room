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
      <a href="#" @click.prevent="$router.push({ name: 'results', query: $route.query})">Back to results</a>
    </div>
    <swiper v-if="place.pics.length" style="background: #eee" :options="{
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
        <div :style="'margin: 0; background-size: contain; background-position: center center; background-repeat: no-repeat; background-image: url('+$utils.image_md(token)+')'" v-square="9/16">

        </div>
      </swiper-slide>
      <template v-if="place.pics.length > 1">
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </template>
    </swiper>
    <div class="mx-1 mt-4">
      <div class="row mb-5 no-gutters">
        <div class="col pr-1">
          <h3>Features</h3>
          <div v-if="!place.perks.length">
            No features
          </div>
          <div v-for="perk in place.perks" :key="perk">
            ✓ {{ $t(`place_perk.${perk}`) }}
          </div>
        </div>
        <div class="col pl-1">
          <h3>Reviews</h3>
          <div>
            No reviews yet.
          </div>
        </div>
      </div>

      <checkout v-if="filters"
      :place="place"
      :filters="filters"/>
    </div>

  </div>
</template>

<script>
import checkout from './checkout'
export default {
  components: {
    checkout,
  },

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
    }
  },

  created () {

  },

  computed: {
  },

  methods: {
  },


  watch: {
    src_place (v) {
      this.place = v
    },
  }
}
</script>

<style lang="scss">
.page-view-place {
  .place-info {
    opacity: .7;
  }
}
</style>
