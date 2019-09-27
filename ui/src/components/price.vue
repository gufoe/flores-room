<template lang="html">
  <span>{{ parseInt(price/1000) }}<span style="font-size: 70%">k₹</span></span>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
</style>
