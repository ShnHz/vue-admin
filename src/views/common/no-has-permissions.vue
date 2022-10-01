<template>
  <div class="page-no-has-permissions-wrap">
    <NoPermisssions />
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
.page-no-has-permissions-wrap {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
}
</style>