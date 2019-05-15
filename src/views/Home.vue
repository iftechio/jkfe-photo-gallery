<template>
  <jike-page
    :title="title"
    class="page"
  >
    <RecycleScroller
      class="photo-gallery"
      :items="list"
      :buffer="200"
      :item-size="getSectionHeight()"
      key-field="id"
    >
      <template v-slot="{ item }">
        <component
          :is="componentMap[item.type]"
          :key="item.pictures[0].id"
          :pictures="item.pictures"
          :type="item.type"
          :cell-width="imageWidth"
        />
      </template>
      <template v-slot:after>
        <infinite-loading
          class="loading"
          @infinite="handleInfinite"
        />
      </template>
    </RecycleScroller>
  </jike-page>
</template>
<style lang="stylus" scoped>
.page
  width 100vw
  height 100vh
  display flex
  flex-flow column
  overflow-y hidden
  .photo-gallery
    flex 1

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
