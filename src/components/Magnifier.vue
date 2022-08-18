<template>
  <div
    v-magnifier
    class="img-wrap"
    :style="{
      width: imgWidth + 'px',
      height: imgHeight + 'px',
    }"
  >
    <a
      :href="link"
      :target="blank ? '_blank' : ''"
      :style="{ width: magWidth + 'px', height: magHeight + 'px' }"
      class="mag-wrap"
    >
      <img
        :src="imgUrl"
        alt=""
        :style="{
          width: imgWidth + 'px',
          height: imgHeight + 'px',
        }"
        class="mag-img"
      />
    </a>
    <a :href="link" class="img-lk">
      <img :src="imgUrl" class="static-img" alt="" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'Magnifier',
  directives: {
    magnifier,
  },
}
</script>
<script setup>
import { magnifier } from '@/directives'
const props = defineProps([
  'link',
  'blank',
  'imgUrl',
  'imgWidth',
  'imgHeight',
  'magWidth',
  'magHeight',
])
</script>

<style lang="less" scoped>
.img-wrap {
  position: relative;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #999;
  .static-img {
    width: 100%;
  }
  .mag-wrap {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: 50%;
    cursor: move;
    overflow: hidden;
    &.show {
      display: block;
      transform: scale(1.5);
    }
    .mag-img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
