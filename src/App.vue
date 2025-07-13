<template>
  <div class="home-page">
    <top-bar />
    <div class="home-content">
      <nav-bar />
      <div class="router-content">
        <router-view v-slot="props">
          <transition name="router-page" mode="out-in">
            <component :is="props.Component"></component>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/nav-bar/nav-bar";
import TopBar from "@/components/top-bar/top-bar.vue";
// import { useMutations, useActions, useCommonGetters } from "@/store/hooks";
// import { useStore } from "@/store";
// const store = useStore();

// const { name, "commonModule/total": total } = useCommonGetters([
//   "name",
//   "commonModule/total",
// ]);

// console.log("[ name.value ] >", name.value, total.value);
</script>

<style lang="less">
.home-page {
  width: 100%;
  display: flex;
  flex-direction: column;

  .home-content {
    display: flex;
    height: calc(100vh - 64px); // fix

    .router-content {
      width: 100%;
      padding: 10px 0px;
      overflow: hidden;
    }
  }
}

.router-page-enter-from,
.router-page-leave-to {
  opacity: 0;
}

.router-page-enter-active,
.router-page-leave-active {
  transition: opacity 0.3s ease;
}
</style>
