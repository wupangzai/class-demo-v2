<template>
  <div class="tomorrow-course-remind">
    <el-card class="card-container" v-custom-loading="loading">
      <template #header>
        <div class="card-header">
          <el-tag type="info" size="large">CA: </el-tag
          ><el-select class="select" v-model="CA" @change="change">
            <el-option
              v-for="ca in CONST.CANameMapList"
              :key="ca.CName"
              :value="ca.CName"
              :label="ca.CName"
            >
            </el-option>
          </el-select>
        </div>
      </template>
      <div class="remind-container">
        <remind-info-card
          class="info-card-item"
          v-model="course.isCopy"
          v-for="(course, index) in renderList"
          :course="course"
          :key="index"
        ></remind-info-card>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CONST } from "@/common";
import RemindInfoCard from "@/components/tomorrow-course-remind/info-card.vue";
import { useMetaBaseData } from "@/hooks";
import { ElNotification } from "element-plus";

interface Course {
  time: string;
  subject: string;
  stuOrClass: string;
  teacher: string;
  classroom: string;
  isOnline: string;
  isCopy: boolean;
}

const CA = ref(CONST.defaultCA.CName);

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
  renderList.value = addIsCopy((await useMetaBaseData(CA.value)).value);
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
        margin: 10px 0px;
        @itemWidth: 400px;
        @itemHeight: 320px;
        @lineCount: 3;
      }
    }
  }

  .card-header {
    .select {
      width: 150px;
      margin-left: 8px;
    }
  }
}
.card-container > .el-card__body {
  height: 100%;
  overflow-y: auto; /* 允许垂直滚动 */
  padding-bottom: 80px;
}
</style>
