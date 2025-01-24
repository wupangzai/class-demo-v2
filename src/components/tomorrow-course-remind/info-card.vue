<template>
  <div class="remind-info-card">
    <el-card style="max-width: 480px" class="card">
      <template #header>
        <div class="card-header">
          <span>{{ props.course.stuOrClass }}</span>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
interface Course {
  time: string;
  subject: string;
  stuOrClass: string;
  teacher: string;
  classroom: string;
  isOnline: string;
}
interface Props {
  course: any;
}
const props = defineProps<Props>();
</script>

<style lang="less">
.remind-info-card {
  width: 350px;

  height: 100%;
  display: flex;
  flex-direction: column;

  .card {
    width: 400px;
  }
}
</style>
