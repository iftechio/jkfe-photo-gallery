<template>
  <div class="section">
    <div
      v-for="picture in pictures"
      :key="picture.thumbnailUrl"
      class="pic"
      :class="{ multiple: picture.multiple }"
      :style="{ backgroundImage: `url(${picture.thumbnailUrl})`, ...picStyle }"
      @click="handleClick(picture)"
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
    background-position  center center
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
    picStyle () {
      return {
        width: this.cellWidth + 'px',
        height: this.cellWidth + 'px',
      }
    },
  },
  methods: {
    handleClick (picture) {
      location.href = `jike://page.jk/originalPost/${picture.id}?userRef=${name}`
    },
  },
}
</script>
