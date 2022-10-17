<template>
  <a-layout>
    <a-layout-sider collapsible :collapsed="commonStore.collapsed" :width="280">
      <LayoutUser />
      <LayoutMenu />
      <!-- trigger -->
      <template #trigger>
        <div class="collapsed-btn-wrap" @click="commonStore.collapsed=!commonStore.collapsed">
          <IconMenuUnfold v-if="collapsed"></IconMenuUnfold>
          <IconMenuFold v-else></IconMenuFold>
        </div>
      </template>
    </a-layout-sider>
    <a-layout :class="{'is-collapsed':commonStore.collapsed}">
      <LayoutHeader />
      <LayoutTabs />
      <a-layout>
        <a-layout>
          <LayoutContent v-if="routerView" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Bus from '@/utils/bus';

import LayoutHeader from './Header.vue'
import LayoutTabs from './Tabs.vue'
import LayoutContent from './Content.vue'
import LayoutMenu from './Menu.vue'
import LayoutUser from './User.vue'

import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'

import { mapStores } from 'pinia'
import useCommonState from '@pinia/modules/common.js'


export default {
  components: {
    LayoutHeader,
    LayoutTabs,
    LayoutContent,
    LayoutMenu,
    LayoutUser,
    IconMenuUnfold,
    IconMenuFold,
  },
  data() {
    return {
      routerView: true,
    }
  },
  mounted() {
    Bus.$on('reload-router-view', this.reloadRouterView)
  },
  computed: {
    ...mapStores(useCommonState),
  },
  methods: {
    // 刷新路由页面
    reloadRouterView() {
      this.routerView = false
      this.$nextTick(() => {
        this.routerView = true
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>