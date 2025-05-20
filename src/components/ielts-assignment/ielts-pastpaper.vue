<template>
  <div class="ielts-pastpaper">
    <el-table
      :data="reverseTableData"
      border
      style="width: 99%"
      :tree-props="{ children: 'children', hasChildren: true }"
      row-key="title"
      :header-cell-class-name="getHeaderColor"
    >
      <el-table-column prop="title" label="Paper-Title" width="180">
      </el-table-column>
      <el-table-column prop="listening" label="听力" width="180">
      </el-table-column>
      <el-table-column prop="reading" label="阅读" width="180">
      </el-table-column>
      <el-table-column prop="both" label="听力阅读" width="180">
      </el-table-column>
      <!-- <el-table-column prop="link" label="下载文件" @click="clickFn">
      </el-table-column> -->
      <el-table-column>
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="输入关键字搜索"
          />
        </template>
        <template #default="{ row, $index }">
          <el-button
            v-if="row.children"
            size="small"
            type="danger"
            @click="handleDown($index, row)"
            >Open</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-card class="card-tips">
      <template v-slot:header>
        <div class="clearfix">
          <span>Tips </span>
        </div>
      </template>
      <div>1、不知道你们的真题版本是不是一样，仅供参考</div>
      <div style="margin-top: 10px">
        2、建议直接Open，打印，但是打印时，【更多设置】-【缩放】不要选择默认，选择
        -【适合可打印区域】
      </div>
      <div style="margin-top: 10px">3、建议用chrome浏览器</div>

      <div style="margin-top: 10px">4、其他没整理，累死哥们了</div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
const ieltsPapers = ref([
  { title: "", listening: "", reading: "", both: "", link: "", children: [] },
]);

const ieltsPaperMap: any = {
  ["4-1"]: {
    listening: "12-19",
    reading: "20-32",
    both: "12-32",
  },
  ["4-2"]: {
    listening: "36-43",
    reading: "44-55",
    both: "36-55",
  },
  ["4-3"]: {
    listening: "59-66",
    reading: "67-79",
    both: "59-79",
  },
  ["4-4"]: {
    listening: "83-89",
    reading: "90-101",
    both: "83-101",
  },
  ["14-1"]: {
    listening: "1-6",
    reading: "7-19",
    both: "1-19",
  },
  ["14-2"]: {
    listening: "23-28",
    reading: "29-40",
    both: "23-40",
  },
  ["14-3"]: {
    listening: "44-49",
    reading: "50-62",
    both: "44-62",
  },
  ["14-4"]: {
    listening: "66-72",
    reading: "73-84",
    both: "66-84",
  },
  ["15-1"]: {
    listening: "11-16",
    reading: "17-28",
    both: "11-28",
  },
  ["15-2"]: {
    listening: "32-37",
    reading: "38-49",
    both: "32-49",
  },
  ["15-3"]: {
    listening: "53-58",
    reading: "59-71",
    both: "53-71",
  },
  ["15-4"]: {
    listening: "75-80",
    reading: "81-93",
    both: "75-93",
  },
  ["16-1"]: {
    listening: "11-16",
    reading: "17-29",
    both: "11-29",
  },
  ["16-2"]: {
    listening: "33-38",
    reading: "39-52",
    both: "33-52",
  },
  ["16-3"]: {
    listening: "56-61",
    reading: "62-73",
    both: "56-73",
  },
  ["16-4"]: {
    listening: "77-82",
    reading: "83-95",
    both: "77-95",
  },
  ["17-1"]: {
    listening: "10-15",
    reading: "16-27",
    both: "10-27",
  },
  ["17-2"]: {
    listening: "31-36",
    reading: "37-49",
    both: "31-49",
  },
  ["17-3"]: {
    listening: "53-58",
    reading: "59-71",
    both: "53-71",
  },
  ["17-4"]: {
    listening: "75-80",
    reading: "81-92",
    both: "75-92",
  },
  ["18-1"]: {
    listening: "12-17",
    reading: "18-30",
    both: "12-30",
  },
  ["18-2"]: {
    listening: "34-40",
    reading: "41-53",
    both: "34-53",
  },
  ["18-3"]: {
    listening: "57-62",
    reading: "63-76",
    both: "57-76",
  },
  ["18-4"]: {
    listening: "80-85",
    reading: "86-97",
    both: "80-97",
  },
  ["19-1"]: {
    listening: "11-16",
    reading: "17-30",
    both: "11-30",
  },
  ["19-2"]: {
    listening: "34-40",
    reading: "41-52",
    both: "34-52",
  },
  ["19-3"]: {
    listening: "56-62",
    reading: "63-75",
    both: "56-75",
  },
  ["19-4"]: {
    listening: "79-84",
    reading: "85-96",
    both: "79-96",
  },
};

const search = ref("");

function getIeltsPapers() {
  let flag = 0;
  const arry: any = [{}];
  for (let i = 4; i <= 19; i++) {
    arry[flag] = {};
    arry[flag]["title"] = `剑${i}`;
    arry[flag]["link"] = `/剑${i}.pdf`;
    arry[flag]["children"] = [1, 2, 3, 4].map((item) => {
      return {
        title: `剑${i}-Test${item}`,
        listening: ieltsPaperMap?.[`${i}-${item}`]?.listening,
        reading: ieltsPaperMap?.[`${i}-${item}`]?.reading,
        both: ieltsPaperMap?.[`${i}-${item}`]?.both,
      };
    });
    flag++;
  }
  ieltsPapers.value = arry;
}

function handleDown(index: number, row: any) {
  window.open(row.link);
}

function getHeaderColor({ row, rowIndex }: { row: any; rowIndex: number }) {
  if (rowIndex === 0) {
    console.log(row);
    return "header-color";
  }
}

const reverseTableData = computed(() => {
  return [...ieltsPapers.value]
    .reverse()
    .filter(
      (data) =>
        !search.value ||
        data.title.toLowerCase().includes(search.value.toLowerCase())
    );
});

onMounted(() => {
  getIeltsPapers();
});
</script>

<style lang="less" scoped>
.ielts-pastpaper {
  width: 100%;
  height: 100%;

  padding: 10px;
  overflow: auto;
  .card-tips {
    width: 99%;
    margin-top: 15px;
    opacity: 0.4;
  }
}
</style>

<style>
.header-color {
  background-color: #f5f7fa !important;
}
</style>
