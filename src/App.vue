<template>
  <div class="home-page">
    <top-bar />
    <div class="home-content">
      <nav-bar />
      <div class="router-content">
        <router-view />
      </div>
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
  display: flex;
  flex-direction: column;

  .home-content {
    display: flex;

    .router-content {
      width: 100%;
      padding: 10px 0px;
    }
  }
}
</style>
