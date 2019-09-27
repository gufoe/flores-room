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
        <div :key="place.id" @click="$router.push({ name: 'manage-place', params: { id: place.id }})" class="place-block">
          <h4>{{ place.name }}</h4>
          <div class="place-location">
            {{ place.loc_addr }},
            {{ place.loc_city }}
          </div>
          <div class="place-rooms">
            {{ place.rooms.length }} rooms
          </div>
          <!-- <a href="#" @click.prevent="$router.push({ name: 'edit-place', params: { id: place.id }})">edit</a> -->
        </div>
        <hr :key="place.id + 'hr'">
      </template>
      <br>
      <br>
      <button @click="$router.push({ name: 'edit-place' })" class="btn btn-primary">
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
    border: 2px solid var(--primary-color);
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
