<template>
  <div class="ielts-test">
    <el-table
      :data="
        ieltsPapers.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      style="width: 99%"
      :tree-props="{ children: 'children', hasChildren: true }"
      row-key="key"
      :header-cell-class-name="getHeaderColor"
    >
      <el-table-column prop="title" label="Paper-Title" width="150">
      </el-table-column>
      <el-table-column prop="listening" label="听力" width="150">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.listening"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'listening')"
            >Open</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="listeningAnswer" label="听力答案" width="150">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.listeningAnswer"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'listeningAnswer')"
            >Open</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="reading" label="阅读" width="150">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.reading"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'reading')"
            >Open</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="readingAnswer" label="阅读答案" width="150">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.readingAnswer"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'readingAnswer')"
            >Open</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="writing" label="写作" width="150">
        <template #default="{ row, $index }">
          <el-button
            v-if="!row.children && row.writing"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'writing')"
            >Open</el-button
          >
        </template>
      </el-table-column>

      <el-table-column prop="audio" label="听力音频" width="250">
        <template #default="{ row, $index }">
          <el-button
            v-if="row.P1"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'P1')"
            >P1</el-button
          >
          <el-button
            v-if="row.P2"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'P2')"
            >P2</el-button
          >
          <el-button
            v-if="row.P3"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'P3')"
            >P3</el-button
          >
          <el-button
            v-if="row.P4"
            size="small"
            type="danger"
            @click="handleDown($index, row, 'P4')"
            >P4</el-button
          >
        </template>
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
        <!-- <template slot-scope="scope" v-if="scope.row.children">
          <el-button
            size="small"
            type="danger"
            @click="handleDown(scope.$index, scope.row)"
            >Download</el-button
          >
        </template> -->
      </el-table-column>
    </el-table>
    <el-card class="card-tips">
      <template v-slot:header>
        <div class="clearfix">
          <span>Tips </span>
        </div>
      </template>
      <div>1、预备班卷子只有一张，故放在第一听力位置</div>
      <div style="margin-top: 10px">2、预备班听力第一题为P1、第二题为P2</div>
      <div style="margin-top: 10px">3、5.5分班结班测试没有作文，问老师</div>
      <div style="margin-top: 10px">4、建议用chrome浏览器</div>
      <div style="margin-top: 10px">5、7.0分没整理，哥们累了</div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const ieltsPapers = ref([
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
  ["预备衔接班"]: {
    ["开班测试"]: {
      listening: "/预备衔接班-开班测试.pdf",
      listeningAnswer: "/预备衔接班-开班测试-答案.pdf",
      audio: {
        P1: "/开班测试听力第一题.m4a",
        P2: "/开班测试听力第二题.mp3",
      },
    },
    ["结班测试"]: {
      listening: "/预备衔接班-结班测试.pdf",
      listeningAnswer: "/预备衔接班-结班测试-答案.pdf",
      audio: {
        P1: "/结班测试听力第一题.mp3",
        P2: "结班测试听力第二题.mp3",
      },
    },
  },
  ["5.5分班"]: {
    ["开班测试"]: {
      listening: "/5.5分班-开班测试-听力.pdf",
      listeningAnswer: "/5.5分班-开班测试-听力-答案.pdf",
      reading: "/5.5分班-开班测试-阅读.pdf",
      readingAnswer: "/5.5分班-开班测试-阅读-答案.pdf",
      writing: "/5.5分班-开班测试-写作.pdf",
      audio: {
        P1: "/4-4-1.mp3",
        P2: "/4-4-2.mp3",
        P3: "/4-4-3.mp3",
        P4: "/4-4-4.mp3",
      },
    },
    ["结班测试"]: {
      listening: "/5.5分班-结班测试-听力.pdf",
      listeningAnswer: "/5.5分班-结班测试-听力-答案.pdf",
      reading: "/5.5分班-结班测试-阅读.pdf",
      readingAnswer: "/5.5分班-结班测试-阅读-答案.pdf",
      writing: "",
      audio: {
        P1: "/7-2-1.mp3",
        P2: "/7-2-2.mp3",
        P3: "/7-2-3.mp3",
        P4: "/7-2-4.mp3",
      },
    },
  },
  ["6.0分班"]: {
    ["开班测试"]: {
      listening: "/6.0分班-开班测试-听力.pdf",
      listeningAnswer: "/6.0分班-开班测试-听力-答案.pdf",
      reading: "/6.0分班-开班测试-阅读.pdf",
      readingAnswer: "/6.0分班-开班测试-阅读-答案.pdf",
      writing: "/6.0分班-开班测试-写作.pdf",
      audio: {
        P1: "/10-4-1.mp3",
        P2: "/10-4-2.mp3",
        P3: "/10-4-3.mp3",
        P4: "/10-4-4.mp3",
      },
    },
    ["结班测试"]: {
      listening: "/6.0分班-结班测试-听力.pdf",
      listeningAnswer: "/6.0分班-结班测试-听力-答案.pdf",
      reading: "/6.0分班-结班测试-阅读.pdf",
      readingAnswer: "/6.0分班-结班测试-阅读-答案.pdf",
      writing: "/6.0分班-结班测试-写作.pdf",
      audio: {
        P1: "/14-2-1.mp3",
        P2: "/14-2-2.mp3",
        P3: "/14-2-3.mp3",
        P4: "/14-2-4.mp3",
      },
    },
  },
  ["6.5分班"]: {
    ["开班测试"]: {
      listening: "/6.5分班-开班测试-听力.pdf",
      listeningAnswer: "/6.5分班-开班测试-听力-答案.pdf",
      reading: "/6.5分班-开班测试-阅读.pdf",
      readingAnswer: "/6.5分班-开班测试-阅读-答案.pdf",
      writing: "/6.5分班-开班测试-写作.pdf",
      audio: {
        P1: "/IELTS 12 Test 5_01.mp3",
        P2: "/IELTS 12 Test 5_02.mp3",
        P3: "/IELTS 12 Test 5_03.mp3",
        P4: "/IELTS 12 Test 5_04.mp3",
      },
    },
    ["结班测试"]: {
      listening: "/6.5分班-结班测试-听力.pdf",
      listeningAnswer: "/6.5分班-结班测试-听力-答案.pdf",
      reading: "/6.5分班-结班测试-阅读.pdf",
      readingAnswer: "/6.5分班-结班测试-阅读-答案.pdf",
      writing: "/6.5分班-结班测试-写作.pdf",
      audio: {
        P1: "/C18 T2 S1.mp3",
        P2: "/C18 T2 S2.mp3",
        P3: "/C18 T2 S3.mp3",
        P4: "/C18 T2 S4.mp3",
      },
    },
  },
};

function getIeltsPapers() {
  const arry: any = [{}];
  ["预备衔接班", "5.5分班", "6.0分班", "6.5分班", "7.0分班"].forEach(
    (clas, index) => {
      arry[index] = {};
      arry[index]["title"] = clas;
      arry[index]["key"] = Math.random();
      arry[index]["children"] = ["开班测试", "结班测试"].map((item) => {
        return {
          key: Math.random(),
          title: ` -- ${item}`,
          listening: linkMap?.[clas]?.[item]?.listening,
          listeningAnswer: linkMap?.[clas]?.[item]?.listeningAnswer,
          reading: linkMap?.[clas]?.[item]?.reading,
          readingAnswer: linkMap?.[clas]?.[item]?.readingAnswer,
          writing: linkMap?.[clas]?.[item]?.writing,
          P1: linkMap?.[clas]?.[item]?.audio?.P1,
          P2: linkMap?.[clas]?.[item]?.audio?.P2,
          P3: linkMap?.[clas]?.[item]?.audio?.P3,
          P4: linkMap?.[clas]?.[item]?.audio?.P4,
        };
      });
    }
  );

  ieltsPapers.value = arry;
}

function handleDown(index: number, row: any, type: string) {
  console.log(index);
  window.open(row[type]);
}

function getHeaderColor({ row, rowIndex }: { row: any; rowIndex: number }) {
  if (rowIndex === 0) {
    console.log(row);
    return "header-color";
  }
}

onMounted(() => {
  getIeltsPapers();
});
</script>

<style lang="less" scoped>
.ielts-test {
  width: 100%;
  height: 100%;
  overflow: auto;
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
