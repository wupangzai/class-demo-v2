<template>
  <div class="course-record">
    <custom-card-container ref="cardContainerRef">
      <template #content>
        <course-record-content></course-record-content>
      </template>
    </custom-card-container>
  </div>
</template>

<script lang="ts" setup>
import CustomCardContainer from "@/components/common/custom-card-container/index.vue";
import { ref } from "vue";
import CourseRecordContent from "@/components/course-record/course-record-content.vue";

const cardContainerRef = ref<InstanceType<typeof CustomCardContainer> | null>(
  null
);

function fn() {
  console.log("[  ] >", cardContainerRef.value?.CA);
}
</script>

<style lang="less">
.course-record {
  width: 100%;
  // height: 100%;
}
</style>
