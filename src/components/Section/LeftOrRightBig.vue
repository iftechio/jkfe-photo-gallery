<template>
  <div
    class="section"
    :class="type"
  >
    <div
      class="big-pic"
      :class="multipleClass(0)"
      :style="firstPicStyle"
      @click="handleClick(0)"
    />
    <div class="small-wrap">
      <div
        class="small-pic"
        :style="secondPicStyle"
        :class="multipleClass(1)"
        @click="handleClick(1)"
      />
      <div
        class="small-pic"
        :style="thirdPicStyle"
        :class="multipleClass(2)"
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
    background-position center center
    margin-bottom 2px
    margin-right 2px
    &.multiple
      position relative
      &:after
        position absolute
        right 10px
        top 10px
        content ''
        display block
        width 15px
        height 15px
        background url('https://cdn.ruguoapp.com/FqqTOzkKWKTUGlw3nrHUiPw1DxIn.png') no-repeat
        background-size cover
  .small-wrap
    display flex
    flex-flow column

</style>
<script>
import { name } from '@/constants'
export default {
  props: {
    type: String,
    pictures: Array,
    cellWidth: Number,
  },
  computed: {
    firstPicStyle () {
      return {
        backgroundImage: `url(${this.pictures[0].middlePicUrl})`,
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
      this.$event({
        action: 'click_photo',
        extra_id: this.pictures[index].id,
      })
      location.href = `jike://page.jk/originalPost/${this.pictures[index].id}?userRef=${name}`
    },
    multipleClass (index) {
      return {
        multiple: this.pictures[index].multiple,
      }
    },
  },
}
</script>
