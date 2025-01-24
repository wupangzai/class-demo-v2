<template>
  <div class="remind-info-card">
    <el-card style="max-width: 480px" class="card">
      <template #header>
        <div class="card-header">
          <span class="header-title">{{ props.course.stuOrClass }}</span>
        </div>
      </template>
      <div class="info-item" v-for="item in classTips" :key="item.key">
        <span>{{ item.label }}{{ item.key === "title" ? "" : ": " }}</span>
        <span>{{ getText(item) }}</span>
      </div>
      <div class="info-item">以上是明天的课程提醒，请查收哈🌹</div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { classTips } from "@/components/tomorrow-course-remind/config";

interface Course {
  time: string;
  subject: string;
  stuOrClass: string;
  teacher: string;
  classroom: string;
  isOnline: string;
}
interface Props {
  course: any;
}
const props = defineProps<Props>();

function getText(item: any) {
  const { key } = item;
  if (key === "title") {
    return "";
  }

  if (key === "address") {
    return item.address;
  }

  if (key === "isOnline") {
    return props.course[key] ? "线上" : "线下";
  }

  return props.course[key];
}
</script>

<style lang="less">
.remind-info-card {
  width: 350px;

  height: 100%;
  display: flex;
  flex-direction: column;

  .card {
    width: 400px;
    height: 320px;

    .header-title {
      font-size: 14px;
      font-weight: bold;
    }

    .info-item {
      margin: 0 0 10px 0;
    }
  }
}
</style>
