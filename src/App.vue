<template>
  <div class="root-container">
    <nav-bar></nav-bar>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/nav-bar/nav-bar";
import { RouterView } from "vue-router";
</script>

<style lang="less">
.root-container {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
