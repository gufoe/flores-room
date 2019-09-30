<template lang="html">
  <div class="mx-2">
    <div class="text-center">
      <h2>Rooms</h2>
      <div class="lh-2">
        You have {{ rooms.length }} rooms.
      </div>
    </div>

    <template v-for="room in rooms">
      <div :key="room.id" @click="$router.push({ name: 'edit-room', params: { room_id: room.id }})" class="room-block">
        <div>{{ room.name }}</div>
        <div class="small">
          {{ room.places }} people room
          -
          {{ $t('room_type.' + (room.is_dorm ? 'dorm' : 'private')) }}
          -
          <span v-if="room.is_active" class="text-success">active</span>
          <span v-else class="text-danger">suspended</span>
        </div>


        <!-- <a href="#" @click.prevent="$router.push({ name: 'edit-room', params: { id: room.id }})">edit</a> -->
      </div>
    </template>
    <div class="text-center my-4">
      <button @click="$router.push({ name: 'edit-room' })" class="btn btn-primary">
        Add a room
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    place: {
      type: Object,
      required: true,
    }
  },

  computed: {
    rooms () {
      return this.place.rooms
    },
  },
}
</script>

<style lang="scss">
.room-block {
  margin:  1rem 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 1.5rem rgba(0,0,0,.15);
  padding: 1rem;
  border-radius: .5rem;
  text-align: center;
}
</style>
