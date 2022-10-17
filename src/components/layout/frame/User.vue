<template>
  <div class="layout-user-wrap" :class="{'is-collapsed':commonState.collapsed}" :title="commonState.userInfo.username">
    <a-avatar :size="commonState.collapsed ? 36 : 50">
      <img alt="avatar" :src="avatar" />
    </a-avatar>
    <div class="user-info-wrap">
      <h3>Hi,{{commonState.userInfo.username}}</h3>
      <p>nice to meet you!</p>
    </div>
  </div>
</template>
<script>
import useCommonState from '@pinia/modules/common.js'

export default {
  data() {
    return {
      commonState:useCommonState(),
    }
  },
  computed:{
    avatar(){
      return this.commonState.getUserAvatar
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-user-wrap {
  display: flex;
  align-items: flex-start;
  width: 280px;
  height: 134px;
  padding: 24px 24px 60px;
  transition: padding 0.1s ease;
  &.is-collapsed {
    padding: 24px 6px 60px;
    ::v-deep(.arco-avatar) {
      width: 36px !important;
      height: 36px !important;
    }
    .user-info-wrap {
      opacity: 0;
    }
  }
  ::v-deep(.arco-avatar) {
    position: relative;
    margin-right: 20px;
    box-shadow: -10px 20px 100px 2px mix($--sideBar-bg, $--color-primary, 30%);
    transition: all $--sideBar-transition-duration ease;
  }
  .user-info-wrap {
    opacity: 1;
    position: relative;
    margin-top: 6px;
    transition: opacity $--sideBar-transition-duration ease;
    p {
      margin-top: 6px;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>