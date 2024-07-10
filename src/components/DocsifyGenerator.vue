<script setup lang="ts">
import docsify from '@/docsify'
</script>

<template>
  <div class="docsify-form">
    <div class="docsify-form-item">
      <label for="" v-if="docsify.hasSidebar">刷新侧边栏目录</label>
      <label for="" v-else>生成侧边栏目录</label>
      <input type="checkbox" v-model="docsify.config.sidebar">
    </div>
  </div>
</template>

<style scoped>
.docsify-form {
  padding: 5px;
}

.docsify-form-item input {
  margin-left: 10px;
}
</style>
