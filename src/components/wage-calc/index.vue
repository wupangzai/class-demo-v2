<template>
  <div class="wage-calc">
    <custom-card-container ref="cardContainerRef">
      <template #other-option>
        <other-option
          v-model:level="level"
          v-model:date="date"
          @handle="confirm"
        ></other-option>
      </template>
      <template #content>
        <wage-content
          :memberList="classMember[cardContainerRef?.CA!]"
          :level="level"
          :VIPTotalHours="VIPTotalHours"
          :classTotalHours="classTotalHours"
        ></wage-content>
      </template>
    </custom-card-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CustomCardContainer from "@/components/common/custom-card-container/index.vue";
import { Level, LevelMap, classMember } from "@/components/wage-calc/config";
import OtherOption from "@/components/wage-calc/other-option.vue";
import { useMetaBaseData } from "@/hooks";
import { dayjs, ElNotification } from "element-plus";
import XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import WageContent from "@/components/wage-calc/wage-content.vue";

const cardContainerRef = ref<InstanceType<typeof CustomCardContainer> | null>(
  null
);

const level = ref<Level>();

const date = ref();

const VIPTotalHours = ref(0);

const classTotalHours = ref(0);

function checkOptionIsEmpty() {
  let message;

  if (!level.value) {
    message = "请选择职级";
  }

  if (!date.value) {
    message = "请选择时间区间";
  }

  if (message) {
    ElNotification({
      title: "Error",
      message,
      type: "error",
    });
  }
  return message;
}

function convertDate(date: string[] | undefined) {
  if (date) {
    const start = date[0];
    const end = date[1];

    return `${start}~${end}`;
  }
}

function coverDataToFitExcel(data: any[]) {
  const list: any[] = [];

  const CAname = cardContainerRef.value?.CA!;

  data.forEach((item) => {
    const value = {
      CAname,
      stuOrClass: item.stuOrClass,
      classDate: dayjs(item.rawStartTime).format("YYYY-MM-DD"),
      level: level.value,
      hourPrice: LevelMap[level.value!],
      duringHour: dayjs(item.rawEndTime).diff(dayjs(item.rawStartTime), "hour"),
    };

    const isClass = Object.keys(classMember[CAname]).includes(item.stuOrClass);

    if (isClass) {
      classMember[CAname][item.stuOrClass].forEach((member: any) => {
        list.push({
          ...value,
          stuType: "班级学员",
          stuName: member,
          classNo: item.stuOrClass,
          pricePay: 0.5 * value.duringHour * LevelMap[level.value!],
        });
        classTotalHours.value += value.duringHour;
      });
    } else {
      list.push({
        ...value,
        stuType: "VIP学员",
        stuName: item.stuOrClass,
        classNo: "",
        pricePay: 1 * value.duringHour * LevelMap[level.value!],
      });
      VIPTotalHours.value += value.duringHour;
    }
  });
  return list;
}

function exportToExcel(list: any) {
  const dataSource = coverDataToFitExcel(list);

  // 假设你有一个表格数据的数组
  const data = [
    [
      "助教姓名",
      "带教日期",
      "学员类别",
      "学生姓名",
      "班级编号",
      "职级",
      "每小时服务奖金",
      "授课课时",
      "服务课消",
    ],
  ];
  dataSource.forEach((item: any) => {
    data.push([
      item.CAname,
      item.classDate,
      item.stuType,
      item.stuName,
      item.classNo,
      item.level,
      item.hourPrice,
      item.duringHour,
      item.pricePay,
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 }, // 第一列宽50个字符宽度单位
    { wch: 20 }, // 第二列宽75个字符宽度单位
    { wch: 15 }, // 第三列宽100个字符宽度单位
    { wch: 15 }, // 第二列宽75个字符宽度单位
    { wch: 25 }, // 第二列宽75个字符宽度单位
    { wch: 15 }, // 第二列宽75个字符宽度单位
    { wch: 15 }, // 第二列宽75个字符宽度单位
    { wch: 10 }, // 第二列宽75个字符宽度单位
  ];

  const keys = Object.keys(worksheet);
  keys.pop(); // 去除特殊值
  keys.pop();
  keys.forEach((key, index) => {
    if (worksheet[key]) {
      worksheet[key].s = {}; // 预设 s
    }
  });

  const headers = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"]; // 设置表头颜色
  headers.forEach((header) => {
    worksheet[header].s.fill = {
      fgColor: { rgb: "4BACC6" },
    };
    worksheet[header].s.alignment = {
      horizontal: "center",
      vertical: "center",
    };
    worksheet[header].s.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // 设置单元格样式
  keys.forEach((key, index) => {
    if (worksheet[key]) {
      worksheet[key].s.font = {
        name: "宋体",
        sz: 12,
      };
    }
  });

  // 创建工作簿并添加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 生成Excel文件
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // 使用blob和FileReader创建一个Blob URL
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  const blobUrl = window.URL.createObjectURL(dataBlob);

  // 使用filesaver.js保存文件
  saveAs(dataBlob, "Excel-课消统计.xlsx");

  // 清理
  window.URL.revokeObjectURL(blobUrl);
}

async function confirm() {
  if (checkOptionIsEmpty()) {
    return;
  }
  const res = await useMetaBaseData(
    cardContainerRef.value?.CA!,
    convertDate(date.value),
    false,
    false
  );

  exportToExcel(res.value);
}
</script>

<style lang="less">
.wage-calc {
  width: 100%;
  height: 100%;
  .el-card__header {
    display: flex;
  }
}
</style>

<style lang="less" scoped>
.wage-calc {
}
</style>
