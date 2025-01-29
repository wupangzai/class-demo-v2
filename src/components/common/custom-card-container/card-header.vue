<template>
  <div class="custom-card-header">
    <div class="card-header">
      <el-tag type="info" size="large">CA: </el-tag
      ><el-select class="select" v-model="model">
        <el-option
          v-for="ca in props.CANameMapList"
          :key="ca.CName"
          :label="ca.CName"
          :value="ca.CName"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CONST } from "@/common";
interface Props {
  CANameMapList: typeof CONST.CANameMapList;
}

const props = withDefaults(defineProps<Props>(), {
  CANameMapList: () => CONST.CANameMapList,
});

const model = defineModel({ type: String });
</script>

<style lang="less">
.custom-card-header {
  .card-header {
    .select {
      width: 150px;
      margin-left: 8px;
    }
  }
}
</style>
