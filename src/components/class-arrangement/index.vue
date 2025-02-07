<template>
  <div class="class-arrangement" v-custom-loading="loading">
    <Control v-model="date" ref="controlRef"></Control>
    <div class="content-container" v-if="controlRef?.computedDate">
      <arrangement-content-item
        v-for="(date, index) in controlRef.computedDate"
        :date="date"
        :key="date.date"
        :value="renderList[index]"
      ></arrangement-content-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Control from "@/components/class-arrangement/control.vue";
import { getMetaBaseCourseArrange } from "@/api/api";
import dayjs from "dayjs";
import ArrangementContentItem from "@/components/class-arrangement/arrangement-content-item.vue";

const date = ref("thisweek");

const controlRef = ref<InstanceType<typeof Control> | null>(null);

const renderList = ref<any[][]>([[]]);

const loading = ref(false);

interface Date {
  date: string;
  dayOfWeek: string;
}
function handleDateToFitAPI(dateList: Record<string, Date>[]) {
  const lastIndex = dateList.length - 1;
  const start = dateList[0].date;
  const end = dateList[lastIndex].date;
  return `${start}~${end}`;
}

/**
 * 获取对应日期的所有课程
 */
async function getAllDateList() {
  if (controlRef.value?.computedDate) {
    return await getMetaBaseCourseArrange(
      handleDateToFitAPI(controlRef.value?.computedDate as any)
    );
  }
}

/**
 * 按天过滤出课程,返回二维数组
 * @param allList
 */
function formatData(allList: any[]) {
  //
  return (
    controlRef.value?.computedDate?.map((date) => {
      return allList.filter(
        (course) => dayjs(course.start).format("YYYY-MM-DD") === date.date
      );
    }) || []
  );
}

function changeLoading() {
  loading.value = !loading.value;
}
async function initData() {
  changeLoading();
  const allList = (await getAllDateList()) || [];
  renderList.value = formatData(allList);
  changeLoading();
}

watch(
  () => controlRef.value?.computedDate,
  async () => {
    await initData();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.class-arrangement {
  width: 100%;
  height: 100%;

  .content-container {
    width: calc(100% - 7px);
    height: calc(100vh - 64px - 40px - 40px);
    display: flex;
    margin-top: 8px;
    overflow: auto;
  }
}
</style>
