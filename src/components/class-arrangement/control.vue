<template>
  <div class="control">
    <el-radio-group v-model="model" size="large">
      <el-radio-button
        v-for="dateItem in dateMapList"
        :label="dateItem.label"
        :value="dateItem.value"
        :key="dateItem.value"
      />
      <el-date-picker
        class="control-date-picker"
        v-model="model"
        type="daterange"
        value-format="YYYY-MM-DD"
        start-placeholder="Start Date"
        end-placeholder="End Date"
      />
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineModel } from "vue";
import dateMapList from "@/components/class-arrangement/config";
import { UTILS } from "@/common";

const model = defineModel();

const computedDate = computed({
  get() {
    if (model.value === "thisweek") {
      return UTILS.getWeekDates("thisweek");
    }

    if (model.value === "nextweek") {
      return UTILS.getWeekDates("nextweek");
    }

    if (Array.isArray(model.value)) {
      return UTILS.getWeekDates("other", model.value);
    }
    return "";
  },
  set() {},
});

defineExpose({
  computedDate,
});
</script>

<style lang="less">
.control {
  width: 100%;
  &-date-picker {
    margin-left: 14px;
  }
}
</style>
