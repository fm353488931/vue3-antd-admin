<template>
  <video id="video" src="" controls preload></video>
</template>

<script setup>
const loadVideo = (url) => {
  const element = document.getElementById('video')
  if (Hls.isSupported()) {
    var hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(element)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      element.play()
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    element.src = url
    element.addEventListener('loadedmetadata', function () {
      element.play()
    })
  }
}
onMounted(() => {
  loadVideo(
    'https://open.ys7.com/v3/openlive/G19363974_1_1.m3u8?expire=1694226089&id=490104798935265280&t=b048b87ab0190806827085b37201a029542be55feb71d59fd299c78f7e33e3fc&ev=100'
  )
})
</script>
