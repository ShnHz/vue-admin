<template>
  <a-layout-header>
    <a-breadcrumb>
      <a-breadcrumb-item>管理系统模板</a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="`breadcrumb-item-${index}`">
        <b v-if="index == breadcrumbList.length - 1">{{item.meta.title}}</b>
        <span v-else>{{item.meta.title}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>

    <div class="right-wrap">
      <span class="time-wrap">{{moment().format('dddd , D MMMM , YYYY')}}</span>
      <span class="notice-wrap">
        <a-tooltip content="通知">
          <a-badge :count="1" dot :offset="[1, 0]">
            <IconNotification />
          </a-badge>
        </a-tooltip>
      </span>
      <span class="refresh-wrap" @click="refresh">
        <a-tooltip content="刷新">
          <IconLoop />
        </a-tooltip>
      </span>
      <span class="fullscreen-wrap" title="全屏" @click="fullscreen">
        <a-tooltip content="全屏">
          <IconFullscreen />
        </a-tooltip>
      </span>
      <span class="out-wrap" title="退出登录" @click="logout" v-if="$store.state.common.token">
        <a-tooltip content="退出登录">
          <IconPoweroff />
        </a-tooltip>
      </span>
      <span class="out-wrap" title="登录" @click="$router.push('/login')" v-else>
        <a-button>登录</a-button>
      </span>
    </div>
  </a-layout-header>
</template>
<script>
import {
  IconNotification,
  IconLoop,
  IconFullscreen,
  IconPoweroff,
} from '@arco-design/web-vue/es/icon'
import { mapGetters } from 'vuex'

export default {
  components: { IconNotification, IconLoop, IconFullscreen, IconPoweroff },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      visitedMenus: 'menu/visitedMenus',
    }),
    breadcrumbList() {
      return this.visitedMenus.filter((item) => {
        return item.meta.title
      })
    },
    title() {
      return this.$route ? this.$route.meta.title : 'Header'
    },
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        let _this = this
        let arr = []
        find(this.$router.options.routes)
        function find(list) {
          for (let i = 0; i < list.length; i++) {
            let isActive = false
            if (list[i].name == _this.$route.name) {
              arr.unshift(list[i])
              return true
            }
            if (list[i].children && list[i].children.length > 0) {
              isActive = find(list[i].children)
              if (isActive) {
                arr.unshift(list[i])
              }
            }
          }
          return false
        }
        this.$store.commit('menu/updateVisitedMenus', arr)
      },
    },
  },
  mounted() { },
  methods: {
    refresh() {
      this.$bus.$emit('reload-router-view')
    },
    notice() { },
    fullscreen() {
      const isFullscreen = document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement || false;

      if (isFullscreen) {
        let exitFullScreen = document.exitFullScreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen ||
          document.msExitFullscreen;
        if (exitFullScreen) {
          exitFullScreen.call(document);
        }
      } else {
        let element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        }
      }

    },
    logout() {
      this.$store.dispatch('common/logout').then(() => { })
    },
  },
}
</script>
<style lang="scss">
#vue-admin-wrap>.arco-layout {
  .arco-layout-header {
    display: flex;
    align-items: center;
    min-width: 880px;
    height: 60px;
    border-bottom: 1px solid #f6f6f6;

    .arco-breadcrumb {
      font-size: 16px;
      transition: all 0.2s ease;
    }

    .right-wrap {
      margin-left: auto;

      svg {
        font-size: 16px;
        color: $--textColor-3;
        transition: color 0.2s ease;

        &:hover {
          color: #000;
        }
      }

      >span {
        margin-left: 16px;

        &:first-child {
          margin-left: 0;
        }
      }

      .notice-wrap {
        cursor: pointer;
      }

      .refresh-wrap {
        cursor: pointer;
      }

      .fullscreen-wrap {
        cursor: pointer;
      }

      .time-wrap {
        font-size: 12px;
        color: $--textColor-3;
      }

      .out-wrap {
        cursor: pointer;
      }
    }
  }
}
</style>