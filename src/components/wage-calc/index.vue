<template>
  <div class="wage-calc">
    <custom-card-container>
      <template #other-option>
        <other-option v-model:level="level" v-model:date="date"></other-option>
      </template>
    </custom-card-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import CustomCardContainer from "@/components/common/custom-card-container/index.vue";
import { Level } from "@/components/wage-calc/config";
import OtherOption from "@/components/wage-calc/other-option.vue";

const cardContainerRef = ref<InstanceType<typeof CustomCardContainer> | null>(
  null
);

const level = ref<Level>();

const date = ref();

watch(level, (newValue) => {
  console.log("[ new ] >", newValue);
});

watch(date, (newValue) => {
  console.log("[ new date] >", newValue);
});
</script>

<style lang="less">
.wage-calc {
  width: 100%;
  height: 100%;
  .el-card__header {
    display: flex;
  }
}
</style>

<style lang="less" scoped>
.wage-calc {
}
</style>
