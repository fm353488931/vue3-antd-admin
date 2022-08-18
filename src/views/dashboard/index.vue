<template>
  <div>
    <Magnifier v-bind="MagnifierProps" />
  </div>
</template>

<script setup>
const MagnifierProps = reactive({
  imgUrl:
    'https://img1.baidu.com/it/u=1738303784,2814028405&fm=253&fmt=auto&app=138&f=JPEG?w=458&h=690',
  blank: true,
  link: 'https://www.baidu.com',
  imgWidth: 414,
  imgHeight: 625,
  magWidth: 150,
  magHeight: 150,
})
</script>
