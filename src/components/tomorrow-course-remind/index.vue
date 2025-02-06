<template>
  <div class="tomorrow-course-remind">
    <custom-card-container
      v-custom-loading="loading"
      ref="cardContainerRef"
      @selected-value-change="change"
    >
      <template #content>
        <div class="remind-container">
          <remind-info-card
            class="info-card-item"
            v-model="course.isCopy"
            v-for="(course, index) in renderList"
            :course="course"
            :key="index"
          ></remind-info-card>
        </div>
      </template>
    </custom-card-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CONST } from "@/common";
import RemindInfoCard from "@/components/tomorrow-course-remind/info-card.vue";
import { useMetaBaseData } from "@/hooks";
import { ElNotification } from "element-plus";

import CustomCardContainer from "@/components/common/custom-card-container/index.vue";

const cardContainerRef = ref<InstanceType<typeof CustomCardContainer> | null>(
  null
);

interface Course {
  time: string;
  subject: string;
  stuOrClass: string;
  teacher: string;
  classroom: string;
  isOnline: string;
  isCopy: boolean;
}

const renderList = ref<Course[]>();

function addIsCopy(list: any) {
  return list.map((item: any) => {
    item.isCopy = false;
    return item;
  });
}

async function change(value: CONST.Name) {
  changeLoading();
  renderList.value = addIsCopy((await useMetaBaseData(value)).value);
  ElNotification({
    title: "Tips",
    message: "切换成功",
    type: "success",
  });
  changeLoading();
}

const loading = ref(false);
function changeLoading() {
  loading.value = !loading.value;
}

onMounted(async () => {
  changeLoading();
  if (cardContainerRef.value) {
    renderList.value = addIsCopy(
      (await useMetaBaseData(cardContainerRef.value?.CA)).value
    );
  }
  changeLoading();
});
</script>

<style lang="less">
.tomorrow-course-remind {
  width: calc(100% - 7px);
  height: 85vh;

  .card-container {
    height: 100%;
    padding-left: 20px;
    // padding-left: 20px;
    .remind-container {
      display: flex;
      flex-wrap: wrap;

      .info-card-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 1 33%;
        margin: 5px 0px;
        @itemWidth: 400px;
        @itemHeight: 320px;
        @lineCount: 3;
      }
    }
  }
}
</style>
