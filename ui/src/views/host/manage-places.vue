<template lang="html">
  <div class="page-places page-padded text-center" style="padding-bottom: 30vh;">
    <h1 class="nm">Your Places</h1>
    <br>
    <div v-if="!$store.user.places.length">
      <p>Begin to host on <b>Flores Room</b> now!</p>
      <br>
      <button @click="$router.push({ name: 'edit-place' })" class="btn btn-primary">
        Start Hosting!
      </button>
    </div>
    <div v-else>
      <hr>
      <template v-for="place in places">
        <div :key="place.id" @click="$router.push({ name: 'manage-place', params: { id: place.id }})" class="place-block pointer">
          <h4>{{ place.name }}</h4>
          <div class="small">
            {{ place.loc_addr }},
            {{ place.loc_city }}
          </div>
          <div class="small">
            {{ place.rooms.filter(r=>r.is_active).length }} active rooms
            -
            <span v-if="place.is_active" class="text-success">active</span>
            <span v-else class="text-danger">suspended</span>
            -
            <span v-if="place.is_verified" class="text-success">verified</span>
            <span v-else class="text-danger">not verified</span>

          </div>
          <!-- <a href="#" @click.prevent="$router.push({ name: 'edit-place', params: { id: place.id }})">edit</a> -->
        </div>
        <hr :key="place.id + 'hr'">
      </template>
      <br>
      <br>
      <button @click="$router.push({ name: 'create-place' })" class="btn btn-primary">
        Add a new place
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    places () {
      return this.$store.user.places
    }
  }
}
</script>

<style lang="scss">
@import '@/vars';

.page-places {
  hr { margin: 0; }
  .place-block {
    // font-family: $headings-font-family;
    border: 2px solid $primary;
    background: #fff;
    box-shadow: 0 0 1rem rgba(0,0,0,.2);
    padding: 10px;
    .place-location, .place-rooms  {
      opacity: .8;
    }
    &.plus {
      font-size: 3rem;
    }
  }
}
</style>
