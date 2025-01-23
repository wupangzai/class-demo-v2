<template>
  <div class="login">login</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  name: String,
});

console.log(props.name);
</script>

<style lang="less">
.login {
}
</style>
