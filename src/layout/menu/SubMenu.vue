<template>
  <a-sub-menu :key="menuInfo.name">
    <template #icon></template>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name" @click="clickMenu(item)">
          <template #icon> </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menuInfo="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => {},
  },
})
const { menuInfo } = toRefs(props)

const router = useRouter()
const clickMenu = (item) => {
  router.push({ name: item.name })
}
</script>
