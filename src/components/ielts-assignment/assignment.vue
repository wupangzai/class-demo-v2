<template>
  <div class="assignment">
    <el-table
      :data="
        ieltsPapers.filter(
          (data: any) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      style="width: 99%"
      :tree-props="{ children: 'children', hasChildren: true }"
      row-key="key"
      :header-cell-class-name="getHeaderColor"
    >
      <el-table-column prop="title" label="Title" width="280">
      </el-table-column>
      <el-table-column prop="raw" label="原稿" width="180">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.raw"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'raw')"
            >Open</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="writing-paper" label="默写纸" width="180">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row['writing-paper']"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'writing-paper')"
            >Open</el-button
          >
        </template>
      </el-table-column>

      <!-- <el-table-column prop="link" label="下载文件" @click="clickFn">
      </el-table-column> -->
      <el-table-column>
        <template #header slot-scope="scope">
          <el-input
            v-model="search"
            size="small"
            placeholder="输入关键字搜索"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const ieltsPapers = ref<any>([
  {
    title: "",
    listening: "",
    listeningAnswer: "",
    reading: "",
    both: "",
    link: "",
    children: [],
    key: Math.random(),
  },
]);

const search = ref("");

const linkMap: any = {
  ["写作(话题)词组"]: {
    ["写作词组"]: {
      raw: "/写作词组.pdf",
      "writing-paper": "/写作词组默写纸.pdf",
    },
    ["写作话题词组"]: {
      raw: "/写作话题.pdf",
      "writing-paper": "/写作话题默写纸.pdf",
    },
  },
  ["写作提分宝典词汇"]: {
    raw: "/写作提分宝典词汇.pdf",
    "writing-paper": "/写作提分宝典词汇默写纸.pdf",
  },
  ["单词默写纸"]: {
    ["单页词汇默写纸"]: {
      raw: "/词汇默写纸.pdf",
    },
    ["双面语料库默写纸"]: {
      raw: "/双面语料库默写纸.pdf",
    },
  },
  ["雅思答题卡"]: {
    ["听力阅读答题卡"]: {
      raw: "/雅思听力阅读答题纸.pdf",
    },
    ["雅思写作Task2答题纸"]: {
      raw: "/雅思写作Task2答题纸.pdf",
    },
  },
  ["未成年雅思报名同意书"]: {
    raw: "/未成年雅思报名同意书.pdf",
  },
};

function getIeltsPapers() {
  const arry: any = [{}];
  [
    "写作(话题)词组",
    "写作提分宝典词汇",
    "单词默写纸",
    "雅思答题卡",
    "未成年雅思报名同意书",
  ].forEach((clas, index) => {
    if (clas === "写作(话题)词组") {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["children"] = ["写作词组", "写作话题词组"].map((item, i) => {
        return {
          key: Math.random(),
          title: ` -- ${item}`,
          raw: linkMap?.[clas]?.[item]?.raw,
          "writing-paper": linkMap?.[clas]?.[item]?.["writing-paper"],
        };
      });
    }

    if (clas === "写作提分宝典词汇") {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["raw"] = linkMap?.[clas]?.raw;
      arry[index]["writing-paper"] = linkMap?.[clas]?.["writing-paper"];
    }

    if (clas === "单词默写纸") {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["children"] = ["单页词汇默写纸", "双面语料库默写纸"].map(
        (item, i) => {
          return {
            key: Math.random(),
            title: ` -- ${item}`,
            raw: linkMap?.[clas]?.[item]?.raw,
          };
        }
      );
    }
    if (clas === "雅思答题卡") {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["children"] = ["听力阅读答题卡", "雅思写作Task2答题纸"].map(
        (item, i) => {
          return {
            key: Math.random(),
            title: ` -- ${item}`,
            raw: linkMap?.[clas]?.[item]?.raw,
          };
        }
      );
    }
    if (clas === "未成年雅思报名同意书") {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["raw"] = linkMap?.[clas]?.raw;
    }
  });

  ieltsPapers.value = arry;
}

function handleDown(index: number, row: any, type: string) {
  console.log(index, row);

  window.open(row[type]);
}

function getHeaderColor({ row, rowIndex }: { row: any; rowIndex: number }) {
  console.log(rowIndex);

  if (rowIndex === 0) {
    return "header-color";
  }
}

onMounted(() => {
  getIeltsPapers();
});
</script>

<style lang="less" scoped>
.assignment {
  width: 100%;
  padding: 10px;

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
