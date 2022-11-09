<template>
  <div class="VideoM3u8" v-if="url">
    <video
      id="myVideo"
      :key="new Date()"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      preload="auto"
      data-setup="{}"
      muted
    >
      <source id="source" :src="url" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script setup>
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { nextTick, onMounted, onUnmounted } from 'vue'
//弹窗
const url = ref('')
const myVideo = ref(null)
onMounted(() => {
  if (url.value) {
    myVideo.value.dispose()
    url.value = ''
  } // 如果有先销毁
  window.$api.monitorDetail({ params: { id: item.id } }).then((res) => {
    url.value = res.url
    nextTick(() => {
      myVideo.value = Videojs('myVideo', {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: false,
      })
      myVideo.value.play() // 视频播放
    })
  })
})
onUnmounted(() => {
  if (url.value) {
    myVideo.value.dispose()
    url.value = ''
  } // 如果有先销毁
})
</script>

<style scoped lang="less">
.VideoM3u8 {
  width: 100%;
  height: 100%;
}
</style>
