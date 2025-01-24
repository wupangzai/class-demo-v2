<template>
  <div class="remind-info-card">
    <el-card style="max-width: 480px" class="card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</p>
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

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
