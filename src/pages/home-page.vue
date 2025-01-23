<template>
  <div class="content-container">
    <button @click="fn1">click</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { API } from "@/api";
import { useLocalStorage } from "@/hooks";

onMounted(async () => {
  const data = await API.getMetaBaseCourseArrange("next1days");
});

function fn1() {}
</script>

<style lang="less">
.content-container {
  width: 100%;
  height: 100%;
}
</style>
