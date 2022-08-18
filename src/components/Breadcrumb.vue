<template>
  <div class="Breadcrumb">
    <a-button v-if="back" type="link" class="back" @click="$router.back()">
      <left-outlined />返回上一级
    </a-button>
    <a-breadcrumb>
      <a-breadcrumb-item v-if="title"> {{ title }} </a-breadcrumb-item>
      <template v-else>
        <template v-for="item in levelList">
          <a-breadcrumb-item :key="item.path" v-if="item.meta.title">
            <span v-if="levelList.indexOf(item) === levelList.length - 1">
              {{ item.meta.title }}
            </span>
            <router-link v-else :to="item.path">
              {{ item.meta.title }}
            </router-link>
          </a-breadcrumb-item>
        </template>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
}
</script>
<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
defineProps({
  back: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
})
const route = useRoute()
let levelList = reactive([])
const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.name)
  levelList = matched
  console.log(levelList)
}
watch(
  route,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.Breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  .ant-breadcrumb {
    line-height: 20px !important;
  }

  .back {
    padding: 0 15px 0 0;
  }
}
</style>
