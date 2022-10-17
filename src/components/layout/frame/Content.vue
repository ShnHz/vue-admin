<template>
  <a-layout-content>
    <router-view v-slot="{ Component }" :key="key" class="content-wrap">
      <keep-alive :include="cachedRoutes" :max="99">
        <transition name="content-view" appear>
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>
<script>
import { mapStores } from 'pinia'
import useTabsBarStore from '@pinia/modules/tabsBar.js'

export default {
  name: 'LayoutContent',
  data() {
    return {}
  },
  computed: {
    ...mapStores(useTabsBarStore),
    cachedRoutes() {
      const cachedRoutesArr = []
      this.tabsBarStore.visitedRoutes.forEach((item) => {
        if (item.meta.keepAlive) {
          cachedRoutesArr.push(item.name)
        }
      })
      return cachedRoutesArr
    },
    key() {
      return this.$route.path
    },
  },
}
</script>
<style lang="scss">
.content-view-leave-active,
.content-view-enter-active {
  transition: all 0.2s;
}

.content-view-enter-from,
.content-view-leave-to {
  opacity: 0;
}

.content-view-leave-from,
.content-view-enter-to {
  opacity: 1;
}

.arco-layout-content>.content-wrap {
  // overflow: auto;
  height: 100%;
  position: relative;
  padding: 24px 0 16px;
}
</style>