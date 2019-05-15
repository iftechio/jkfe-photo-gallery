/** 图片排版算法 */
/** 左大图 右大图 全小图 */
/**
 * message {
 *  id: string,
 *  pictures: [],
 * }
 */
/**
 * section {
 *  type: 'leftBig' | 'rightBig' | 'sixPic'
 *  pictures: []
 * }
 */
/**
 * picture {
 *  width: number,
 *  height: number,
 *  ratio: number,
 *  id: string originalPostId
 * }
 */
import { minBy, slice } from 'lodash'
import Vue from 'vue'
import { message } from '@/api'
import qs from 'qs'

const typeSort = 'leftBig sixPic rightBig sixPic'.split(' ')

export const gallery = new Vue({
  data () {
    const params = qs.parse(location.search.slice(1))
    return {
      list: [],
      rawMessages: [],
      topic: params.topic,
      loadMoreKey: undefined,
    }
  },
  methods: {
    compositePicture () {
      let messages = this.rawMessages
      let lastResult
      while (messages.length > 0) {
        const currentType = this.findCurrentType()
        lastResult = null
        if (currentType === 'leftBig' || currentType === 'rightBig') {
          lastResult = this.renderLeftOrRightBigSection(messages, currentType)
        } else if (currentType === 'sixPic') {
          lastResult = this.renderSixPicSction(messages)
        }
        if (lastResult) {
          this.list.push(lastResult[0])
          messages = lastResult[1]
        } else {
          break
        }
      }
      this.rawMessages = messages
    },
    renderLeftOrRightBigSection (messages, side = 'leftBig') {
      const result = []
      if (messages.length < 3) {
        return false
      }
      for (let i = 0; i < 3; i++) {
        // TODO 选出大图的比例
        const temp = this.findPictureByRatio(messages[i].pictures)
        result.push(temp)
      }
      return [
        {
          type: side,
          pictures: result,
          id: result[0].thumbnailUrl,
        },
        slice(messages, 3),
      ]
    },
    renderSixPicSction (messages) {
      const result = []
      if (messages.length < 6) {
        return false
      }
      for (let i = 0; i < 6; i++) {
        const temp = this.findPictureByRatio(messages[i].pictures)
        result.push(temp)
      }
      return [
        {
          type: 'sixPic',
          pictures: result,
          id: result[0].thumbnailUrl,
        },
        slice(messages, 6),
      ]
    },
    /** 找到最合适比例的图片 展示是否多张图 */
    findPictureByRatio (pictures, ratio = 1) {
      const perfectPic = minBy(pictures, (picture) => picture.ratio - ratio)
      return {
        ...perfectPic,
        multiple: pictures.length > 1,
      }
    },
    /** 找到当前应该的排版类型 */
    findCurrentType () {
      const index = (this.list.length) % typeSort.length
      return typeSort[index]
    },
    /** 加载数据 过滤数据 排版数据 */
    async fetchOriginalPost ($state) {
      const res = await message.history({
        topic: this.topic,
        loadMoreKey: this.loadMoreKey,
        limit: 30,
      })
      this.rawMessages.push(...res.data
        .map(originalPost => this.transformOriginalPost(originalPost))
        .filter(originalPost => originalPost)
        .filter(originalPost => originalPost.pictures && originalPost.pictures.length > 0)
        .map(originalPost => this.transformPictures(originalPost))
      )
      this.compositePicture()
      this.loadMoreKey = res.loadMoreKey
      if (res.data.length > 0 && res.loadMoreKey) {
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    transformOriginalPost (originalPost) {
      if (originalPost.type === 'ORIGINAL_POST') {
        return {
          id: originalPost.id,
          pictures: originalPost.pictures,
        }
      } else if (originalPost.messageType === 'PERSONAL_UPDATE_ORIGINAL_POST') {
        return {
          pictures: originalPost.personalUpdate.pictures,
          id: originalPost.personalUpdate.id,
        }
      }
    },
    transformPictures (originalPost) {
      return {
        ...originalPost,
        pictures: originalPost.pictures.map(picture => ({
          ...picture,
          id: originalPost.id,
          ratio: picture.width / picture.height,
        })),
      }
    },
  },
})
