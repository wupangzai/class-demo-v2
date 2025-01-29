<template>
  <div class="custom-card-container">
    <el-card class="card-container">
      <template #header>
        <slot name="header">
          <card-header
            v-model="CA"
            :CANameMapList="props.CANameMapList"
          ></card-header>
        </slot>
      </template>
      <div class="content-container">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import cardHeader from "@/components/common/custom-card-container/card-header.vue";
import { CONST } from "@/common";
import { ref } from "vue";

interface Props {
  CANameMapList?: typeof CONST.CANameMapList;
}
const props = defineProps<Props>();

const CA = ref(CONST.defaultCA.CName);

defineExpose({
  CA,
});
</script>

<style lang="less">
.custom-card-container {
  width: calc(100% - 7px);
  height: 85vh;
  background-color: aqua;

  .card-container {
    height: 100%;

    .el-card__body {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
