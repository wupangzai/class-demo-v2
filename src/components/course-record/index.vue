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
            @emit-check-feedback-action="getFeedbackActionAndOpenDialog"
          ></course-record-content>
        </div>
      </template>
    </custom-card-container>

    <!-- drawer -->

    <el-drawer
      v-model="drawer"
      :title="drawerTitle"
      @closed="closeDialog"
      class="drawer"
      size="60%"
    >
      <template #header>
        <el-button @click="copyAsImage" type="warning">copy</el-button>
      </template>
      <div class="container-text" id="container-text">
        <p class="title">本次课程内容：</p>
        <div
          v-html="dialogContent?.teaching_record?.content"
          class="text-content"
        ></div>
        <p class="title">学生存在问题和对应解决方案：</p>
        <div
          class="text-content"
          v-html="dialogContent?.teaching_record?.problem"
        ></div>
        <p class="title">本次课程作业：</p>
        <div
          v-html="dialogContent?.teaching_record?.homework"
          class="text-content"
        ></div>
        <p class="title">上次作业情况:</p>
        <span
          v-html="dialogContent?.teaching_record?.last_homework"
          class="text-content"
        ></span>
        <p class="title">下次课程内容:</p>
        <span
          v-html="dialogContent?.teaching_record?.next_content"
          class="text-content"
        ></span>
        <p class="title">填写时间:</p>
        <div
          v-html="dialogContent?.teaching_record?.updated_at"
          class="text-content"
        ></div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import CustomCardContainer from "@/components/common/custom-card-container/index.vue";
import { computed, ref, watch } from "vue";
import CourseRecordContent from "@/components/course-record/course-record-content.vue";
import { useLocalStorage, useMetaBaseData } from "@/hooks";
import dayjs from "dayjs";
import { API } from "@/api";
import { ElNotification } from "element-plus";
import html2canvas from "html2canvas";

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
    console.log("1", renderList.value);
    loading.value = false;
  }
}

function updateCheck(value: boolean, day: string, index: number) {
  const CA = cardContainerRef.value?.CA;

  renderList.value[day][index].isCheck = value;
  useLocalStorage(`${CA}course-record`, renderList.value);
}

const drawer = ref(false);
const dialogContent = ref<any>({});
function closeDialog() {
  drawer.value = false;
  dialogContent.value = null;
}
async function getFeedbackActionAndOpenDialog(id: number) {
  drawer.value = true;
  const res = await API.getFeedBackDetailContent(id);
  dialogContent.value = res;
}

const drawerTitle = computed(() => {
  if (dialogContent.value) {
    return `${dialogContent.value?.start}-----${dialogContent.value?.end}--${dialogContent.value?.teacher_name}`;
  }
  return "";
});

async function copyAsImage() {
  const element = document.getElementById("container-text") as HTMLElement;

  const canvas = await html2canvas(element); // 保留透明背景
  canvas.toBlob(async (blob: any) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      ElNotification({
        title: "Tips",
        message: "Copy successfully",
        type: "success",
      });
    } catch (err) {
      console.error("❌ 复制失败", err);
      alert("❌ 无法复制，请检查权限或浏览器支持情况");
    }
  });
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

  .container-text {
    white-space: pre-line;
    padding: 15px;
  }

  .drawer {
    width: 60%;
    .title {
      color: #070919 !important;
      font-weight: 700 !important;
      font-size: 12px;
    }
    .text-content {
      color: #546e7a;
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.33px;
    }
  }
}
</style>
