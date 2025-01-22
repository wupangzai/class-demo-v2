<template>
  <div class="content-container">123456</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { API } from "@/api";
import customDialog from "@/components/common/dialog/custom-dialog.vue";

onMounted(async () => {
  const data = await API.getMetaBaseCourseArrange("next1days");
  console.log(data);
  console.log("customDialog", customDialog);
});
</script>

<style lang="less">
.content-container {
  width: 100%;
  height: 100%;
}
</style>
