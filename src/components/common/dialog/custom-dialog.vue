<template>
  <el-dialog v-model="props.visible" title="Tips" width="500">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer" v-if="footer">
        <el-button @click="handleClose('cancel')">Cancel</el-button>
        <el-button type="primary" @click="handleClose('confirm')">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElButton, ElDialog } from "element-plus";
import { CloseType } from "@/components/common/dialog/index";

const props = defineProps({
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
