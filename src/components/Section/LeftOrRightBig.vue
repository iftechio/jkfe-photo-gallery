<template>
  <div
    class="section"
    :class="type"
  >
    <div
      class="big-pic"
      :style="firstPicStyle"
      @click="handleClick(0)"
    />
    <div class="small-wrap">
      <div
        class="small-pic"
        :style="secondPicStyle"
        @click="handleClick(1)"
      />
      <div
        class="small-pic"
        :style="thirdPicStyle"
        @click="handleClick(2)"
      />
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.section
  display flex
  flex-flow row nowrap
  width calc(100vw + 2px)
  &.rightBig
    flex-flow row-reverse nowrap
  .big-pic, .small-pic
    background-color #eee
    background-size cover
    margin-bottom 2px
    margin-right 2px
  .small-wrap
    display flex
    flex-flow column

</style>
<script>
export default {
  props: {
    type: String,
    pictures: Array,
    cellWidth: Number,
  },
  computed: {
    firstPicStyle () {
      return {
        backgroundImage: `url(${this.pictures[0].thumbnailUrl})`,
        width: this.cellWidth * 2 + 2 + 'px',
        height: this.cellWidth * 2 + 2 + 'px',
      }
    },
    secondPicStyle () {
      return {
        backgroundImage: `url(${this.pictures[1].thumbnailUrl})`,
        width: this.cellWidth + 'px',
        height: this.cellWidth + 'px',
      }
    },
    thirdPicStyle () {
      return {
        backgroundImage: `url(${this.pictures[2].thumbnailUrl})`,
        width: this.cellWidth + 'px',
        height: this.cellWidth + 'px',
      }
    },
  },
  methods: {
    handleClick (index) {
      location.href = `jike://page.jk/originalPost/${this.pictures[index].id}`
    },
  },
}
</script>
