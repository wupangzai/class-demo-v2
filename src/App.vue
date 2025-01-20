<template>
  <div class="home-page">
    <top-bar />
    <div class="home-content">
      <nav-bar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/nav-bar/nav-bar";
import TopBar from "@/components/top-bar/top-bar.vue";
</script>

<style lang="less">
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-content {
    display: flex;
  }
}
</style>
