<template>
  <div class="tomorrow-course-remind">
    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <el-tag type="info" size="large">CA: </el-tag
          ><el-select class="select" v-model="CA">
            <el-option
              v-for="ca in CANameMapList"
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
import { defaultCA, CANameMapList } from "@/common/const";
import RemindInfoCard from "@/components/tomorrow-course-remind/info-card.vue";
import { useMetaBaseData } from "@/hooks";

interface Course {
  time: string;
  subject: string;
  stuOrClass: string;
  teacher: string;
  classroom: string;
  isOnline: string;
}

const CA = ref(defaultCA.CName);

const renderList = ref<Record<string, any>[]>([{}]);

onMounted(async () => {
  renderList.value = (await useMetaBaseData("吴彬")).value;
});
</script>

<style lang="less">
.tomorrow-course-remind {
  width: calc(100% - 7px);
  height: 85vh;

  .card-container {
    height: 100%;
    overflow-y: auto;

    // padding-right: 40px;
    padding-left: 20px;
    .remind-container {
      display: flex;
      flex-wrap: wrap;

      // justify-content: center;
      gap: 10px;

      .info-card-item {
        flex: 0 0 calc((100% - 20px) / 3); /* 每行 3 项，均分宽度 */
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
</style>
