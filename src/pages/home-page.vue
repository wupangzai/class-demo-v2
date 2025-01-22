<template>
  <div class="content-container">123456</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted } from "vue";

onMounted(async () => {
  const $http = getCurrentInstance()?.appContext.config.globalProperties.$http;
  const result = await $http?.get(
    "/myclass/json?parameters=%5B%7B%22type%22%3A%22category%22%2C%22value%22%3A%5B%22%E5%8D%8A%E6%B5%B7%E4%BA%BA%E5%B9%BF%E6%97%97%E8%88%B0%22%5D%2C%22id%22%3A%22e7ab001d-adfb-44aa-7cd3-96ee5f8d0dc2%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22dept%22%5D%5D%7D%2C%7B%22type%22%3A%22date%2Fall-options%22%2C%22value%22%3A%22next1days%22%2C%22id%22%3A%22953e6c0e-7467-721c-8065-fa3451526c25%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22template-tag%22%2C%22date%22%5D%5D%7D%2C%7B%22type%22%3A%22category%22%2C%22value%22%3Anull%2C%22id%22%3A%22627547e3-e078-8cd7-1c44-0038eba685e3%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22stuName%22%5D%5D%7D%5D"
  );
  console.log(result);
});
</script>

<style lang="less">
.content-container {
  width: 100%;
  height: 100%;
}
</style>
