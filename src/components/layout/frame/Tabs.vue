<template>
  <div class="tabs-wrap">
    <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
      <a-tabs type="card" @tabClick="handleClick" @delete="handleDelete" editable :active-key="tabActive">
        <a-tab-pane :closable="!(item.meta.affix == true)" :key="item.fullPath" v-for="(item) in tabsBarStore.visitedRoutes">
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
import { mapStores } from 'pinia'
import useTabsBarStore from '@pinia/modules/tabsBar.js'

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
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useTabsBarStore),
  },
  created() {
    this.initAffixTabs(this.$router.options.routes)
    this.addTabs(this.$route)
  },
  methods: {
    async handleDelete(fullPath) {
      const view = this.tabsBarStore.visitedRoutes.find((item) => {
        return fullPath === item.fullPath
      })
      await this.tabsBarStore.delVisitedRoute(view)
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
      const latestView = this.tabsBarStore.visitedRoutes.slice(-1)[0]
      if (latestView) this.$router.push(latestView)
      else this.$router.push('/')
    },

    async addTabs(tag) {
      if ((tag.matched && tag.matched[0].meta.hasTabs) || tag.hasTabs) {
        if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
          let matched = [tag.name]
          if (tag.matched) matched = tag.matched.map((item) => item.name)
          await this.tabsBarStore.addVisitedRoute({
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
      this.tabsBarStore.delAllVisitedRoutes()
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
// #vue-admin-wrap > .arco-layout {
//   .tabs-wrap {
//     display: flex;
//     align-items: flex-end;
//     width: calc(100% + 48px);
//     height: 50px;
//     position: relative;
//     left: -24px;
//     padding: 0 24px;
//     border-bottom: 1px solid $--sys-borderColor;
//     .arco-tabs {
//       min-width: 100%;
//       .arco-tabs-nav {
//         &::before {
//           display: none;
//         }
//         .arco-tabs-nav-tab-list {
//           .arco-tabs-tab {
//             padding: 8px 24px;
//             margin-right: -18px;
//             margin-top: 1px;
//             border: 0;
//             background: $tabs-item-bg;
//             transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
//             border-radius: 16px 12px 0 0;
//             .arco-tabs-tab-close-btn {
//               display: none;
//               position: relative;
//               top: -1px;
//               margin-left: 10px;
//               font-size: 12px;

//               .arco-icon-hover-size-medium {
//                 font-size: 10px;
//               }
//               &::before {
//                 transform: translate(-50%, -46%);
//               }
//             }
//             &:hover {
//               padding: 8px 24px 8px 30px;
//               background: $tabs-item-bg__hover;
//               -webkit-mask: url('/static/img/bg/tabsbg.png');
//               -webkit-mask-size: 100% 100%;
//               mask: url('/static/img/bg/tabsbg.png');
//               mask-size: 100% 100%;
//               .arco-tabs-tab-close-btn {
//                 display: block;
//               }
//             }
//             &.arco-tabs-tab-active {
//               padding: 8px 24px 8px 30px;
//               background: $tabs-item-bg__active;
//               -webkit-mask: url('/static/img/bg/tabsbg.png');
//               -webkit-mask-size: 100% 100%;
//               mask: url('/static/img/bg/tabsbg.png');
//               mask-size: 100% 100%;
//               .arco-tabs-tab-close-btn {
//                 display: block;
//               }
//             }
//           }
//         }
//       }
//       .arco-tabs-content {
//         display: none;
//       }
//     }
//   }
// }

#vue-admin-wrap>.arco-layout {
  .tabs-wrap {
    display: flex;
    align-items: flex-end;
    width: calc(100% + 48px);
    position: relative;
    left: -24px;
    padding: 8px 24px;
    border-bottom: 1px solid $--sys-borderColor;

    .arco-tabs {
      min-width: 100%;

      .arco-tabs-nav {
        &::before {
          display: none;
        }

        .arco-tabs-nav-tab-list {
          .arco-tabs-tab {
            padding: 8px 16px;
            margin-right: 8px;
            border: 0;
            background: $tabs-item-bg;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            border-radius: 8px;

            .arco-tabs-tab-close-btn {
              opacity: 0;
              width: 0px;
              position: relative;
              top: -2px;
              margin-left: 0px;
              font-size: 12px;
              transition: all .2s;

              .arco-icon-hover-size-medium {
                font-size: 10px;

                &::before {
                  transform: translate(-50%, -42%);
                }
              }


            }

            &:hover {
              background: $tabs-item-bg__hover;

              .arco-tabs-tab-close-btn {
                opacity: 1;
                width: 10px;
                margin-left: 10px;
              }
            }

            &.arco-tabs-tab-active {
              background: $tabs-item-bg__active;
              font-weight: 800;
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