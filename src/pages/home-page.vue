<template>
  <div class="content-container">
    <el-button @click="fn1" type="primary">click</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { API } from "@/api";
import Login from "@/components/login/index.vue";
import { useDialog } from "@/components/common/dialog";
import { http } from "@/packages/axios/common";

onMounted(async () => {
  const data = await API.getMetaBaseCourseArrange("next1days");
});

async function fn1() {
  // const res = useDialog({
  //   content: Login,
  //   dialogProps: {
  //     title: "登录",
  //     footer: false,
  //   },
  // });
  const res = await API.validateToken();
  console.log("[ res ] >", res);
}
</script>

<style lang="less">
.content-container {
  width: 100%;
  height: 100%;
}
</style>
