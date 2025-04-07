<template>
  <div class="course-record-content">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>{{ props.day }}</span>
          <el-button type="primary" link style="float: right">
            <span>{{ props.dayOfWeek }}</span>
          </el-button>
        </div>
      </template>
      <div class="course-record-info">
        <div v-for="(listItem, index) in list" :key="index" class="info-item">
          <el-checkbox
            :model-value="listItem.isCheck"
            @change="(value: boolean) => change(value, index)"
          >
            <el-tag :type="getTagType()"
              >{{ listItem.time }}
              <span style="margin-left: 10px">
                {{ listItem.stuOrClass }}
              </span>
              <span style="margin-left: 10px">
                {{ listItem.subject }}
              </span></el-tag
            >
            <el-tag
              style="margin-left: 10px"
              :type="getFeedBackTagType(listItem.feedBack?.is_feedback_text)"
              >{{ listItem.feedBack?.is_feedback_text }}</el-tag
            >
          </el-checkbox>
          <el-icon class="icon" @click="() => handleCopy(listItem.stuOrClass)"
            ><CopyDocument
          /></el-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from "@/hooks";
import { CopyDocument } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

interface Props {
  day: string;
  dayOfWeek: string;
  list: Record<string, any>[] | undefined;
}
const props = defineProps<Props>();

const { copy } = useClipboard();

function getTagType() {
  return props.dayOfWeek === "Yesterday" ? "primary" : "warning";
}

function getFeedBackTagType(type: string) {
  return type === "已填写" ? "success" : "danger";
}

function handleCopy(text: string) {
  copy(text);
  ElNotification({
    title: "Tips",
    message: "Copy successfully",
    type: "success",
  });
}

const emits = defineEmits<{
  (e: "update-check", value: boolean, day: string, index: number): void;
}>();

function change(value: boolean, index: number) {
  emits("update-check", value, props.day, index);
}
</script>

<style lang="less" scoped>
.course-record-content {
  //   width: 100%;
  //   height: 100%;
  //   flex: 0 0 50%;
  //   display: flex;
  //   justify-content: center;

  .card {
    min-width: 480px;
    height: 500px;
    .el-card__body {
      overflow-y: auto;
      padding-bottom: 80px;
    }
  }
  .info-item {
    margin-bottom: 10px;

    .icon {
      margin-left: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
