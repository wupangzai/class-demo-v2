<template>
  <div class="wage-other-option">
    <div class="option-item">
      <el-tag type="info" size="large" class="tag">Level: </el-tag
      ><el-select class="select" v-model="modelLevel" @change="change">
        <el-option
          v-for="item in level"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="option-item">
      <el-tag type="info" size="large" class="tag">Range: </el-tag>
      <el-date-picker
        v-model="modelDate"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
    <div class="option-item">
      <el-button @click="handle" type="primary">Confirm</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { level, Level } from "@/components/wage-calc/config";

const modelLevel = defineModel<Level>("level");

const modelDate = defineModel("date");

const emits = defineEmits<{
  (e: "handle"): void;
}>();

function change() {}

function handle() {
  emits("handle");
}
</script>

<style lang="less" scoped>
.wage-other-option {
  display: flex;
  height: 100%;
  margin-left: 20px;

  .option-item {
    margin-right: 20px;
    display: flex;
  }

  .tag {
    margin-right: 8px;
  }

  .select {
    width: 150px;
  }
}
</style>
