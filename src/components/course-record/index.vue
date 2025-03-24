<template>
  <div class="course-record" v-custom-loading="loading">
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
import { API } from "@/api";
import { get } from "lodash";

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

async function getstuOrClassId(info: any) {
  const res = info.isTypeEqualClass
    ? await API.getClassInfo(info.stuOrClass)
    : await API.getStudentInfo(info.stuOrClass);

  return res.list[0].id;
}

let loading = ref(false);
async function getFeedBackList(list: any, date: Date) {
  const memberListWithNoRepeat = [
    ...new Set(list.map((member: any) => member.stuOrClass)),
  ] as any[];

  let res = [];
  for (const item of memberListWithNoRepeat) {
    const infoObj = list.find((stu: any) => stu.stuOrClass === item);
    const id = await getstuOrClassId(infoObj);
    res.push(
      ...(
        await API.getFeedBack(
          id,
          infoObj.isTypeEqualClass,
          dayjs(getDay(date)).format("YYYY-MM-DD 00:00:00"),
          dayjs(getDay(date)).format("YYYY-MM-DD 23:59:59")
        )
      ).list
    );
  }
  return res;
}

const renderList = ref<Record<string, any>>({});
async function initComponentData() {
  loading.value = true;
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

    const dayTools = [
      { date: yesterday, txt: "Yesterday" as Date },
      { date: today, txt: "Today" as Date },
    ];

    const feedBackInfoList: any[] = [];
    for (const dayInfo of dayTools) {
      feedBackInfoList.push(
        await getFeedBackList(renderList.value[dayInfo.date], dayInfo.txt)
      );
    }

    console.log("feedBackInfoList", feedBackInfoList);

    const keys = Object.keys(renderList.value);
    keys.forEach((key, index) => {
      renderList.value[key].forEach((listItem: any) => {
        listItem.feedBack = feedBackInfoList[index].find(
          (feedBackInfo: any) => {
            return (
              feedBackInfo.object_name === listItem.stuOrClass &&
              dayjs(listItem.rawStartTime).format("YYYY-MM-DD hh:mm:ss") ===
                dayjs(feedBackInfo.start).format("YYYY-MM-DD hh:mm:ss")
            );
          }
        );
      });
    });
    console.log(renderList.value);
    loading.value = false;
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
