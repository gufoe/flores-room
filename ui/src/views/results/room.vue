<template lang="html">
  <div class="book-room">
    <div class="row no-gutters">
      <div class="col-6 room-perks mb-1">
        Features:
        <div v-for="perk in room.perks" :key="perk">
          ✓ {{ $t(`room_perk.${perk}`) }}
        </div>
      </div>
      <div class="col-6 room-shape">
        Room:
        <div v-for="(count, type) in room.shape" :key="type" style="text-transform: lowercase">
          <i :class="`bed ${type}`" style="font-size: 1.2rem;"></i>
          &nbsp;
          {{ count }}
          {{ $t(`bed_type.${type}`) }}
          bed
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div v-for="size in [1,2]" :key="size"
          v-if="(beds = room[`av_b${size}`]) && (price = room[`b${size}_price`])"
          class="col text-center ml-1">
            <div>
              <div class="row no-gutters align-center">
                <i style="font-size: 2rem; margin-right: .5rem" :class="{bed: true, single: size==1, double: size==2 }"></i>
                <div class="col text-left">
                  <span>
                    <price :price="price"/> each
                  </span>
                  <div class="small">{{ beds }} available</div>
                </div>
              </div>
              <div>
                <!-- <input
                :value="booking[size]"
                @input="booking[size] = $event.target.value*1"
                class="custom-range" type="range"
                :min="0" :max="beds"
                style="width: 100%"/> -->
              </div>
              <div v-if="booking[size]">
                {{ booking[size] }}<span class="small">x</span> =
                <b><price :price="booking[size] * room[`b${size}_price`]"/></b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
    booking: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/vars';

.book-room {
  .room-perks div, .room-shape div {
    font-size: .9rem;
    opacity: .6;
  }
}
</style>
