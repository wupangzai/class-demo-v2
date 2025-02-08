<template>
  <div class="top-bar">
    <slot name="title">
      <div class="title">
        <el-icon :size="24"><MoonNight /></el-icon>
        <span class="icon-desc">-- version 2.0</span>
      </div>
    </slot>
    <slot name="right-content">
      <div class="right-content">
        <el-avatar :icon="UserFilled" :size="36" />
        <div class="user-name">user-name</div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { MoonNight } from "@element-plus/icons-vue";
import { UserFilled } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 64px;
  display: flex;
  background: linear-gradient(45deg, #6a5acd, #f7f3f2);
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    color: white;
    padding-left: 25px;

    .icon-desc {
      padding-left: 16px;
      font-size: 12px;
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;

    .user-name {
      font-size: 14px;
      color: #9fa1a6;
      padding: 0 16px;
    }
  }
}
</style>
