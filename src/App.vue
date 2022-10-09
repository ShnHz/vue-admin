<template>
  <a-config-provider>
    <div id="vue-admin-wrap">
      <router-view />
    </div>

    <template #empty>
      <Empty />
    </template>
  </a-config-provider>
</template>
<style lang="scss" scoped>

</style>
