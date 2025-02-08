<template>
  <el-dialog v-model="props.visible" width="500">
    <template #header>
      <span class="custom-header">{{ props.title }}</span>
    </template>
    <slot></slot>
    <template #footer>
      <div class="dialog-footer" v-if="footer">
        <el-button @click="handleClose('cancel')">Cancel</el-button>
        <el-button type="info" @click="handleClose('confirm')">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { CloseType } from "@/components/common/dialog/index";

const props = defineProps({
  title: String,
  visible: Boolean,
  footer: Boolean,
});

const emits = defineEmits<{
  (e: "update:visible", value: boolean, type: CloseType): void;
}>();

function handleClose(type: CloseType) {
  emits("update:visible", false, type);
}
</script>

<style lang="less" scoped>
.custom-header {
  color: var(--el-color-info);
}
</style>
