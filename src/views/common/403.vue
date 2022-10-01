<template>
  <div class="page-403-wrap">
    <a-result status="403" subtitle="您没有权限访问该页面">
      <template #extra>
        <a-space>
          <a-button @click="mixins_contactAdministrator">联系管理员</a-button>
          <a-button type="primary" @click="back">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.page-403-wrap {
  display: flex;
  align-items: center;
  // height: 100vh;
  width: 100%;
  position: relative;
}
</style>