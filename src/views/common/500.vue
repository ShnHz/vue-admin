<template>
  <div class="page-500-wrap">
    <a-result status="500" subtitle="500，服务器未知错误">
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
.page-500-wrap {
  display: flex;
  align-items: center;
  // height: 100vh;
  width: 100%;
  position: relative;
}
</style>