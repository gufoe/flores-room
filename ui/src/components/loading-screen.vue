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
  color: #888;
  padding: 5rem 1rem;
}
</style>
