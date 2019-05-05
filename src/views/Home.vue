<template>
  <jike-page
    :title="title"
    class="page"
  >
    <div class="gallery-wrap">
      <div class="photo-gallery">
        <div
          v-for="item in list"
          :key="item.id"
          class="photo-item"
          :class="{ multiple: isMultiple(item) }"
          :style="{backgroundImage: `url(${getFirstImage(item)})`, ...photoItemStyle }"
          @click="handleGotoOriginalPost(item)"
        />
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
  // overflow-x hidden
.gallery-wrap
  width 100vw
  overflow-x hidden
.photo-gallery
  display flex
  flex-flow row wrap
  width calc(100vw + 4px)
  // justify-content space-between
  .photo-item
    flex 0 0 auto
    height 80px
    background-color #eee
    background-size cover
    margin-bottom 2px
    margin-right 2px
    position relative
    &.multiple
      &:after
        position absolute
        content: ''
        display block
        background #000
        height 15px
        width 15px
        right 5px
        top 5px
// .loading
//   margin-top 20px
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { message } from '@/api'
import qs from 'qs'
export default {
  name: 'Home',
  components: {
    InfiniteLoading,
  },
  data () {
    const params = qs.parse(location.search.slice(1))
    return {
      list: [],
      loadMoreKey: undefined,
      topic: params.topic,
      imageWidth: (window.innerWidth - 2 * 2) / 3,
    }
  },
  computed: {
    photoItemStyle () {
      return {
        width: this.imageWidth + 'px',
        height: this.imageWidth + 'px',
      }
    },
    title () {
      if (this.list.length > 0) {
        return this.list[0].topic.content
      }
      return ''
    },
  },
  methods: {
    async handleInfinite ($state) {
      const res = await message.history({
        topic: this.topic,
        loadMoreKey: this.loadMoreKey,
        limit: 30,
      })
      this.list.push(...res.data.filter(item => {
        const pictures = this.getPictures(item)
        return pictures && pictures.length > 0
      }))
      this.loadMoreKey = res.loadMoreKey
      if (res.data.length > 0) {
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    getPictures (originalPost) {
      if (originalPost.type === 'ORIGINAL_POST') {
        return originalPost.pictures
      } else if (originalPost.messageType === 'PERSONAL_UPDATE_ORIGINAL_POST') {
        return originalPost.personalUpdate.pictures
      }
    },
    getFirstImage (originalPost) {
      const pictures = this.getPictures(originalPost)
      return pictures[0].smallPicUrl
    },
    isMultiple (originalPost) {
      const pictures = this.getPictures(originalPost)
      return pictures.length > 1
    },
    handleGotoOriginalPost (originalPost) {
      if (originalPost.type === 'ORIGINAL_POST') {
        location.href = `jike://page.jk/originalPost/${originalPost.id}`
      }
    },
  },
}
</script>
