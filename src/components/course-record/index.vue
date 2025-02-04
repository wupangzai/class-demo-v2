<template>
  <div class="course-record">
    <custom-card-container ref="cardContainerRef">
      <template #content>
        <div class="record-content-container">
          <course-record-content
            v-for="day in DAYS"
            :list="renderList[getDay(day as Date)]"
            :day="getDay(day as Date)"
            :dayOfWeek="day"
            :key="day"
            @update-check="updateCheck"
          ></course-record-content>
        </div>
      </template>
    </custom-card-container>
  </div>
</template>

<script lang="ts" setup>
import CustomCardContainer from "@/components/common/custom-card-container/index.vue";
import { onMounted, ref, render, watch } from "vue";
import CourseRecordContent from "@/components/course-record/course-record-content.vue";
import { useLocalStorage, useMetaBaseData } from "@/hooks";
import dayjs from "dayjs";

const DAYS = ["Yesterday", "Today"];

const cardContainerRef = ref<InstanceType<typeof CustomCardContainer> | null>(
  null
);

async function getMetaBaseData(date: string) {
  const CA = cardContainerRef.value?.CA;
  if (CA) {
    const res = (await useMetaBaseData(CA, date, false)).value;
    return res;
  }
}

type Date = "Today" | "Yesterday";
function getDay(date: Date) {
  if (date === "Yesterday") {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  return dayjs().format("YYYY-MM-DD");
}

function handleDateParam(date: string) {
  return `${date}~${date}`;
}

function addCheckAttribute(List: any) {
  return List.map((item: any) => {
    item.isCheck ? (item.isCheck = true) : (item.isCheck = false);
    return item;
  });
}

const renderList = ref<Record<string, any>>({});
async function initComponentData() {
  const CA = cardContainerRef.value?.CA;
  if (CA) {
    const yesterday = getDay("Yesterday");
    const yesterdayRecord = addCheckAttribute(
      await getMetaBaseData(handleDateParam(getDay("Yesterday")))
    );

    const today = getDay("Today");
    const todayRecord = addCheckAttribute(
      await getMetaBaseData(handleDateParam(getDay("Today")))
    );

    const localData = useLocalStorage(`${CA}course-record`);

    renderList.value = localData.value = {
      [yesterday]: localData.value?.[yesterday] ?? yesterdayRecord,
      [today]: localData.value?.[today] ?? todayRecord,
    };
  }
}

function updateCheck(value: boolean, day: string, index: number) {
  const CA = cardContainerRef.value?.CA;

  renderList.value[day][index].isCheck = value;
  useLocalStorage(`${CA}course-record`, renderList.value);
}

watch(
  () => cardContainerRef.value?.CA,
  async (newValue, oldValue) => {
    newValue !== oldValue && initComponentData();
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.course-record {
  // width: 100%;
  // height: 100%;
  .record-content-container {
    display: flex;
    justify-content: space-around;
    // align-items: center;
  }
}
</style>
