<template lang="html">
  <span>{{ parseInt(price/1000) }}<span style="font-size: 70%"><span v-if="extended">.000 </span>₹</span></span>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    extended: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
</style>
