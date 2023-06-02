<template>
  <div class="sub-title-wrap">
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.sub-title-wrap {
  display: flex;
  align-items: center;
  padding-bottom: $--module-padding;
  &::before {
    content: '';
    display: block;
    height: 16px;
    width: 4px;
    position: relative;
    margin-right: 6px;
    border-radius: 8px;
    background: $--color-primary;
    box-shadow: 3px 3px 12px 5px #4c50600f;
  }
  p {
    margin-left: 8px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $--textColor-5;
  }
}
</style>