<template lang="html">
  <div class="book-room">
    <div class="row gutters-1">
      <div class="col-6 room-perks mb-1">
        <div class="mb-1">Features:</div>
        <div v-for="perk in room.perks" :key="perk"
        class="element small">
          ✓ {{ $t(`room_perk.${perk}`) }}
        </div>
      </div>
      <div class="col-6 room-shape">
        <div class="mb-1">Composition:</div>
        <div v-for="(count, type) in room.shape" :key="type"
        class="element small" style="text-transform: lowercase">
          <i :class="`bed ${type}`" style="font-size: 1.2rem;"></i>
          &nbsp;
          {{ count }}
          {{ $t(`bed_type.${type}`) }}
          bed
        </div>
      </div>
      <div class="col-12 mt-2 py-1" style="border-top: 1px solid #ddd">
        <div class="row align-center gutters-1 mt-3 mb-2" v-if="!room.is_dorm">
          <div class="col text-right mr-2">
            Total price:
            <price :price="room.price"/>
          </div>
          <div class="col">
            <button v-if="!booking['room']" class="btn btn-primary" @click="booking['room'] = !booking['room']">
              Select
            </button>
            <button v-else class="btn btn-warning" @click="booking['room'] = !booking['room']">
              Cancel
            </button>
          </div>
        </div>
        <div class="row gutters-1" v-else>
          <div v-for="size in [1,2]" :key="size"
          v-if="((tot_beds = room[`b${size}_count`]) && (price = room[`b${size}_price`])) && ((av_beds = room[`av_b${size}`]) || 1)"
          class="col">
            <div>
              <span>
                {{ $t('bed_type.'+(size==1?'single':'double')) }} bed
                for
                <price :price="price" class="text-info"/>
              </span>
              <div class="small faded mb-1">{{ av_beds }}/{{ tot_beds }} available</div>
              <div v-if="av_beds" class="row no-gutters">
                <div class="col-8">
                  <number-input v-model="booking[size]" :max="av_beds"/>
                </div>
                <div class="col">
                  <div v-if="booking[size]">
                    <price :price="booking[size] * room[`b${size}_price`]" class="text-info"/>
                  </div>
                </div>
                <!-- <input
                :value="booking[size]"
                @input="booking[size] = $event.target.value*1"
                class="custom-range" type="range"
                :min="0" :max="av_beds"
                style="width: 100%"/> -->
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
    places_left: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/vars';

.book-room {
  .room-perks .element, .room-shape .element {
    color: #666;
  }
}
</style>
