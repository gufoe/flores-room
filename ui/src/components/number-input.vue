<template lang="html">
  <div :class="`number-input-${variant} input-group`">
    <div class="input-group-prepend">
      <button :class="`btn btn-${variant}`"
      :disabled="value <= min"
      @click="set(value*1-1)">
        -
      </button>
    </div>
    <input type="number" class="form-control text-center" :value="input" @input="set($event.target.value)" style="max-width: 2rem">
    <div class="input-group-append">
      <button :class="`btn btn-${variant}`"
      :disabled="value >= max"
      @click="set(value*1+1)">
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },

  data () {
    return {
      input: 0,
    }
  },

  methods: {
    set (val) {
      this.input = ''
      this.$nextTick(() => {
        if (val !== '') val = 1*val
        this.input = val > this.max ? this.max : val < this.min ? this.min : val
        this.$emit('input', this.input)
      })
    },
  },

  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (this.input == '' && v == 0) return
        this.set(v)
      }
    },
  }
}
</script>

<style lang="scss">
@import '@/vars';

@each $color, $value in $theme-colors {
  .number-input-#{$color} {
    .form-control {
      border-color: $value;
      background: $input-bg!important;
      padding: 0 0;
    }
    .btn, .form-control {
      height: 1.7rem;
    }
    .btn {
      padding: 0rem .5rem .3rem;
      line-height:0;
      font-size: 1.4rem;
    }
  }
}
</style>
