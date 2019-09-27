<template lang="html">
  <div class="cp-loading text-center is-middle">
    <slot>Loading...</slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.cp-loading {
  font-size: 1.1rem;
  opacity: .5;
}
</style>
