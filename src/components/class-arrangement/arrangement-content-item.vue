<template>
  <div class="arrangement-content-item">
    <el-card class="box-card" :class="getTodyClass()">
      <template #header>
        <div class="card-header">
          <span>{{ props.date.dayOfWeek }}</span>
          <el-button class="button" type="text">{{ date.date }}</el-button>
        </div>
      </template>
      <div
        v-for="(name, i) in CONST.CANameMapList"
        class="item-content-container"
        :key="i"
      >
        <el-tag type="info">{{ getText(name.CName) }}</el-tag>
        <div
          v-for="(course, i) in getRenderList(name.CName)"
          class="item-info"
          :key="i"
        >
          <div>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="course.subject"
              placement="top"
            >
              <div>
                <span>{{ course.time }}</span>
                <span class="stu">{{ course.stuOrClass }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { CONST } from "@/common";
import { formatPropertyAndCA } from "@/hooks";
import dayjs from "dayjs";
interface Props {
  value: any;
  date: {
    date: string;
    dayOfWeek: string;
  };
}

const props = defineProps<Props>();

function getRenderList(CName: string) {
  return props.value ? formatPropertyAndCA(props.value, CName) : [];
}

function getText(CName: string) {
  return `${CName} 共${getRenderList(CName).length}节课程`;
}

function getTodyClass() {
  return dayjs().format("YYYY-MM-DD") === props.date.date && "high-light";
}
</script>

<style lang="less" scoped>
.arrangement-content-item {
  flex: 0 1 14%;
  width: 100%;
  justify-content: space-around;
  margin-right: 5px;
  //   padding: 5px;

  /* height: 100vh; */
  height: 85vh;

  .high-light {
    background-color: #fdf6ec;
  }

  .box-card {
    width: 180px;
    .card-header {
      font-size: 14px;

      .button {
        color: red;
        font-size: 12px;
        float: right;
        padding-bottom: 25px;
      }
    }
    .item-content-container {
      margin-bottom: 15px;
      font-size: 12px;
      .item-info {
        margin-top: 5px;
        .stu {
          color: var(--el-color-primary);
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
