<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="[sizeStyle, colorStyle]"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    sizeStyle() {
      return {
        'font-size': this.size
      }
    },
    colorStyle() {
      return {
        color: this.color
      }
    }
  }
}
</script>

<style>
</style>
