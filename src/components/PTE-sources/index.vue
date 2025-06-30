<template>
  <div class="timetable">
    <el-table :data="tableData" style="width: 99%" ref="targetRef">
      <el-table-column prop="name">
        <!-- <template #header>
          <el-button @click="capture">下载</el-button>
        </template> -->
      </el-table-column>
      <el-table-column label="Timetable Form">
        <el-table-column
          :prop="date.date"
          v-for="(date, i) in weekMapArray"
          :key="date"
        >
          <template #header>
            <div class="date-detail">
              <div class="date">{{ date.date }}</div>
              <div class="day-of-week">
                {{ date.dayOfWeek }}
              </div>
            </div>
          </template>
          <template #default="{ row }">
            <el-select
              filterable
              multiple
              v-model="row[`day${i + 1}`]"
              allow-create
              style="width: 150px"
              clearable
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
              <template #tag>
                <el-tag
                  v-for="(option, ind) in row[`day${i + 1}`]"
                  :key="ind"
                  :type="getTagStyle(option)"
                >
                  {{ option }}
                </el-tag>
              </template>
            </el-select>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { UTILS } from "@/common";
import { useLocalStorage } from "@/hooks";
import { CANameMapList } from "@/common";
import { CANameMap } from "@/common/const";
import { onMounted, ref } from "vue";

const weekMapArray = UTILS.getWeekDates("thisweek");
const targetRef = ref<HTMLElement | null>(null);

const timeOptions = [
  {
    value: "8:00-17:00",
    style: "#E63415",
  },
  {
    value: "9:00-18:00",
  },
  {
    value: "10:00-19:00",
  },
  {
    value: "13:00-21:00",
  },
  {
    value: "休假",
  },
  {
    value: "调休",
  },
];

function initPerson(personArray: CANameMap[]) {
  return personArray.map((person) => {
    return {
      name: person.CName,
      day1: "",
      day2: "",
      day3: "",
      day4: "",
      day5: "",
      day6: "",
      day7: "",
    };
  });
}

const getTagStyle = (time: string) => {
  switch (time) {
    case "休假":
    case "调休":
      return "success";
    default:
      return "primary";
  }
};

const tableData = useLocalStorage("time-table").value
  ? useLocalStorage("time-table")
  : useLocalStorage("time-table", initPerson(CANameMapList));

onMounted(() => {
  console.log(tableData.value);
  if (tableData.value.length !== CANameMapList.length) {
    CANameMapList.forEach((person) => {
      if (!tableData.value.find((item: any) => item.name === person.CName)) {
        tableData.value.push({
          name: person.CName,
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          day7: "",
        });
      }
    });
  }
});
</script>

<style lang="less" scoped>
.timetable {
  padding-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
