<template>
  <router-view v-slot="{ Component }">
    <transition :name="route.meta.transition">
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const includeList = reactive([])
watch(
  route,
  (newRoute) => {
    if (newRoute.meta.keepAlive && !includeList.includes(newRoute.name)) {
      includeList.push(newRoute.name)
    }
  },
  { deep: true }
)
</script>
