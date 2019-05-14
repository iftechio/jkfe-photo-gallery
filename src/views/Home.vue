<template>
  <jike-page
    :title="title"
    class="page"
  >
    <div class="gallery-wrap">
      <div class="photo-gallery">
        <template
          v-for="item in list"
        >
          <SixPicSection
            v-if="item.type === 'sixPic'"
            :key="item.pictures[0].id"
            :pictures="item.pictures"
            :type="item.type"
            :cell-width="imageWidth"
          />
          <LeftOrRightBigSection
            v-if="item.type === 'leftBig' || item.type === 'rightBig'"
            :key="item.pictures[0].id"
            :pictures="item.pictures"
            :type="item.type"
            :cell-width="imageWidth"
          />
        </template>
      </div>
    </div>
    <infinite-loading
      class="loading"
      @infinite="handleInfinite"
    />
  </jike-page>
</template>
<style lang="stylus" scoped>
.page
  width 100vw
  overflow-y hidden
.gallery-wrap
  width 100vw
  overflow-x hidden
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
  },
}
</script>
