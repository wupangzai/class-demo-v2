<template>
  <div class="content-container">123456</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { API } from "@/api";
import { useDialog } from "@/components/common/dialog";
import Login from "@/components/login/index.vue";

onMounted(async () => {
  const data = await API.getMetaBaseCourseArrange("next1days");
});
</script>

<style lang="less">
.content-container {
  width: 100%;
  height: 100%;
}
</style>
