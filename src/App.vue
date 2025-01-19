<template>
  <div class="home-page">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/nav-bar/nav-bar";
</script>

<style lang="less">
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
