<template lang="html">
  <div class="input-group mb-3 justify-center">
    <div class="input-group-prepend">
      <span class="input-group-text">₹</span>
    </div>
    <input v-model="price" type="number" class="form-control text-right" max="150" min="0" style="max-width: 3rem">
    <div class="input-group-append">
      <span class="input-group-text" style="padding-left: .3rem">.000</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    price: {
      get () {
        return parseInt(this.value / 1000) || ''
      },
      set (v) {
        this.$emit('input', (parseInt(v) || 0) * 1000)
      }
    }
  },
}
</script>

<style lang="scss">
</style>
