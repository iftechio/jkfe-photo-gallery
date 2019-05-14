<template>
  <div class="section">
    <div
      v-for="picture in pictures"
      :key="picture.thumbnailUrl"
      class="pic"
      :style="{ backgroundImage: `url(${picture.thumbnailUrl})`, ...picStyle }"
    />
  </div>
</template>
<style lang="stylus" scoped>
.section
  display flex
  flex-flow row wrap
  width calc(100vw + 4px)
  .pic
    background-color #eeeeee
    background-size cover
    margin-bottom 2px
    margin-right 2px
</style>
<script>
export default {
  props: {
    type: String,
    pictures: Array,
    cellWidth: Number,
  },
  computed: {
    picStyle () {
      return {
        width: this.cellWidth + 'px',
        height: this.cellWidth + 'px',
      }
    },
  },
}
</script>
