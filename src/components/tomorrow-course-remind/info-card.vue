<template>
  <div class="remind-info-card" v-if="props.course.time">
    <el-card style="max-width: 480px" class="card">
      <template #header>
        <div class="card-header">
          <span class="header-title">{{ props.course.stuOrClass }}</span>
          <el-button type="primary" link @click="handleCopy">
            <span v-if="!props.course.isCopy">Copy</span>
            <el-icon v-else><Check /></el-icon>
          </el-button>
        </div>
      </template>

      <div ref="copyDom">
        <div class="info-item" v-for="item in classTips" :key="item.key">
          <span>{{ item.label }}{{ item.key === "title" ? "" : ": " }}</span>
          <span>{{ getText(item) }}</span>
        </div>
        <div class="info-item">以上是明天的课程提醒，请查收哈</div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineModel } from "vue";
import { classTips } from "@/components/tomorrow-course-remind/config";
import { useClipboard } from "@/hooks";
import { ElNotification, NotificationParams } from "element-plus";
import { Check } from "@element-plus/icons-vue";

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

  if (key === "subject") {
    return `${props.course.subject}@${props.course.teacher}`;
  }

  if (key === "address") {
    return item.address;
  }

  if (key === "isOnline") {
    return props.course[key] ? "线上" : "线下";
  }

  return props.course[key];
}

const { copy } = useClipboard();
const copyDom = ref<HTMLElement | null>(null);

const model = defineModel();
async function handleCopy() {
  if (copyDom.value) {
    const isSuccess = await copy(copyDom.value);
    model.value = true;

    const info = isSuccess
      ? { message: "copy successfully", type: "success" }
      : { message: "occur error", type: "error" };
    ElNotification(
      Object.assign({ title: "Tips" }, info as NotificationParams)
    );
  }
}
</script>

<style lang="less" scoped>
.remind-info-card {
  width: 350px;

  height: 100%;
  display: flex;
  flex-direction: column;

  .card {
    width: 400px;
    height: 330px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-title {
      font-size: 14px;
      font-weight: bold;
    }

    .info-item {
      margin: 0 0 10px 0;

      &:nth-last-child(1) {
        margin: 0;
      }
    }
  }
}
</style>

<!-- <style lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> -->
