<template>
  <div>
    <component
      :is="componentMap[item.type]"
      v-for="item in list"
      :key="item.pictures[0].id"
      :pictures="item.pictures"
      :type="item.type"
      :cell-width="imageWidth"
    />
    <infinite-loading
      :distance="500"
      spinner="circles"
      class="loading"
      @infinite="handleInfinite"
    />
  </div>
</template>
<style lang="stylus" scoped>
.page
  width 100vw
  display flex
  overflow-y hidden
  flex-flow column
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import qs from 'qs'
import { gallery } from '@/gallery'
import { topic } from '@/api'
import LeftOrRightBigSection from '@/components/Section/LeftOrRightBig.vue'
import SixPicSection from '@/components/Section/SixPic.vue'

export default {
  name: 'Home',
  components: {
    InfiniteLoading,
    SixPicSection,
    LeftOrRightBigSection,
  },
  data () {
    const params = qs.parse(location.search.slice(1))
    return {
      list: gallery.list,
      topic: params.topic,
      imageWidth: (window.innerWidth - 2 * 2) / 3,
      title: '',
      componentMap: {
        leftBig: 'LeftOrRightBigSection',
        rightBig: 'LeftOrRightBigSection',
        sixPic: 'SixPicSection',
      },
    }
  },
  mounted () {
    topic.detail(this.topic).then(res => {
      this.title = res.data.content
    })
  },
  methods: {
    handleInfinite ($state) {
      gallery.fetchOriginalPost($state)
    },
    getSectionHeight () {
      return this.imageWidth * 2 + 2 * 2
    },
  },
}
</script>
