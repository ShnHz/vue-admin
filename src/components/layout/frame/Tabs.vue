<template>
  <div class="tabs-wrap">
    <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
      <a-tabs type="card" @tabClick="handleClick" @delete="handleDelete" editable :active-key="tabActive">
        <a-tab-pane :closable="!(item.meta.affix == true)" :key="item.fullPath" v-for="(item) in visitedRoutes">
          <template #title>{{item.meta.title}}</template>
        </a-tab-pane>
      </a-tabs>

      <template #content>
        <a-doption @click="delAllVisitedRoutesFun">关闭全部</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
<script>
import { IconLeft, IconRight } from '@arco-design/web-vue/es/icon'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    IconLeft,
    IconRight,
  },
  data() {
    return {
      tabActive: null,
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(route) {
        this.addTabs(route)
      },
    },
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'tabsBar/visitedRoutes',
    }),
  },
  created() {
    this.initAffixTabs(this.$router.options.routes)
    this.addTabs(this.$route)
  },
  methods: {
    async handleDelete(fullPath) {
      const view = this.visitedRoutes.find((item) => {
        return fullPath === item.fullPath
      })
      await this.delVisitedRoute(view)
      if (view.path === this.$route.path) this.toLastTag()
    },
    handleClick(fullPath) {
      this.$router.push({
        path: fullPath,
      })
    },

    initAffixTabs(routes, hasTabs) {
      routes.forEach((item) => {
        if (item.meta && item.meta.affix)
          this.addTabs({
            ...item,
            fullPath: item.path,
            hasTabs: hasTabs,
          })
        if (item.children)
          this.initAffixTabs(item.children, item.meta && item.meta.hasTabs)
      })
    },
    toLastTag() {
      const latestView = this.visitedRoutes.slice(-1)[0]
      if (latestView) this.$router.push(latestView)
      else this.$router.push('/')
    },

    ...mapActions({
      addVisitedRoute: 'tabsBar/addVisitedRoute',
      delVisitedRoute: 'tabsBar/delVisitedRoute',
      delOthersVisitedRoutes: 'tabsBar/delOthersVisitedRoutes',
      delAllVisitedRoutes: 'tabsBar/delAllVisitedRoutes',
    }),
    async addTabs(tag) {
      if ((tag.matched && tag.matched[0].meta.hasTabs) || tag.hasTabs) {
        if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
          let matched = [tag.name]
          if (tag.matched) matched = tag.matched.map((item) => item.name)
          await this.addVisitedRoute({
            path: tag.path,
            fullPath: tag.fullPath,
            query: tag.query,
            params: tag.params,
            name: tag.name,
            matched: matched,
            meta: { ...tag.meta },
          })
          this.tabActive = tag.fullPath
        }
      }
    },
    delAllVisitedRoutesFun() {
      this.delAllVisitedRoutes()
      this.$router.push({
        name: 'Index',
      })
    },
  },
}
</script>
<style lang="scss" >
$tabs-item-bg: #fff;
$tabs-item-bg__active: $--color-primary-bg;
$tabs-item-bg__hover: #dee1e6;
#vue-admin-wrap > .arco-layout {
  .tabs-wrap {
    display: flex;
    align-items: flex-end;
    width: calc(100% + 48px);
    height: 50px;
    position: relative;
    left: -24px;
    padding: 0 24px;
    border-bottom: 1px solid $--sys-borderColor;
    .arco-tabs {
      min-width: 100%;
      .arco-tabs-nav {
        &::before {
          display: none;
        }
        .arco-tabs-nav-tab-list {
          .arco-tabs-tab {
            padding: 8px 24px;
            margin-right: -18px;
            margin-top: 1px;
            border: 0;
            background: $tabs-item-bg;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            border-radius: 12px 12px 0 0;
            .arco-tabs-tab-close-btn {
              display: none;
              position: relative;
              top: -1px;
              margin-left: 10px;
              font-size: 12px;

              .arco-icon-hover-size-medium {
                font-size: 10px;
              }
              &::before {
                transform: translate(-50%, -46%);
              }
            }
            &:hover {
              padding: 8px 24px 8px 30px;
              background: $tabs-item-bg__hover;
              -webkit-mask: url('/static/img/bg/tabsbg.png');
              -webkit-mask-size: 100% 100%;
              mask: url('/static/img/bg/tabsbg.png');
              mask-size: 100% 100%;
              .arco-tabs-tab-close-btn {
                display: block;
              }
            }
            &.arco-tabs-tab-active {
              padding: 8px 24px 8px 30px;
              background: $tabs-item-bg__active;
              -webkit-mask: url('/static/img/bg/tabsbg.png');
              -webkit-mask-size: 100% 100%;
              mask: url('/static/img/bg/tabsbg.png');
              mask-size: 100% 100%;
              .arco-tabs-tab-close-btn {
                display: block;
              }
            }
          }
        }
      }
      .arco-tabs-content {
        display: none;
      }
    }
  }
}
</style>