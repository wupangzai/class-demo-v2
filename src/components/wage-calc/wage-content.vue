<template>
  <div class="wage-content">
    <el-card style="max-width: 480px" class="wage-content-card">
      <template #header>
        <div class="card-header">
          <span>班课列表</span>
        </div>
      </template>
      <div
        v-for="(value, key) in props.memberList"
        class="text item"
        :key="key"
      >
        <el-tag>{{ key }}</el-tag>
        <div
          v-for="stu in value"
          :key="stu"
          style="margin: 8px; color: #666; font-size: 12px"
        >
          {{ stu }}
        </div>
      </div>
    </el-card>
    <el-card style="max-width: 480px" class="wage-content-card">
      <template #header>
        <div class="card-header">
          <span>总计</span>
        </div>
      </template>
      <div>
        VIP辅练总时长： <el-tag>{{ props.VIPTotalHours }}</el-tag>
      </div>
      <div style="margin-top: 20px">
        VIP课消统计：
        <el-tag class="des-tag" type="danger">{{
          1 * VIPTotalHours * LevelMap[props.level!]
        }}</el-tag>
      </div>

      <div style="margin-top: 20px">
        班课辅练总时长： <el-tag>{{ props.classTotalHours }}</el-tag>
      </div>
      <div style="margin-top: 20px">
        班级课消统计：
        <el-tag class="des-tag" type="danger">{{
          0.5 * classTotalHours * LevelMap[props.level!]
        }}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Level, LevelMap } from "@/components/wage-calc/config";

interface Props {
  memberList: any;
  VIPTotalHours: number;
  classTotalHours: number;
  level: Level | undefined;
}

const props = defineProps<Props>();
</script>

<style lang="less" scoped>
.wage-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;

  .wage-content-card {
    flex: 1 0 50%;
    max-height: 500px;
  }
}
</style>
