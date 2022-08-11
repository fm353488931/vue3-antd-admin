<template>
  <a-menu
    class="menu"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="light"
  >
    <template v-for="item in menus" :key="item.name">
      <!-- 一级菜单 -->
      <template v-if="!item.children">
        <a-menu-item :key="item.name" @click="clickMenu(item)">
          <template #icon> </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <!-- 二级菜单 -->
      <template v-else>
        <SubMenu :key="item.name" :menuInfo="item" />
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import SubMenu from './SubMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import routerInstance from '@/router'
const route = useRoute()
const router = useRouter()
const menus = routerInstance.options.routes[1].children
const selectedKeys = ref([route.name])
const openKeys = ref([])
const clickMenu = (item) => {
  router.push({ name: item.name })
}
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
