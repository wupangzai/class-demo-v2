<template>
  <div class="class-form">
    <el-tabs type="border-card" class="border-card-mine">
      <el-tab-pane label="模板下载">
        <div class="download-area">
          <div class="info-form">
            <div>
              <el-tag> 👇生成学员信息表 </el-tag>
              <el-tag type="info">
                <a href="/学员信息表-template.xlsx" download
                  >点击下载学员信息表模板文件</a
                >
              </el-tag>
            </div>
            <div>
              <el-upload
                class="upload-demo"
                drag
                action=""
                :on-error="fileChangeInfo"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </div>
            <div v-for="info in tagList" :key="info" style="margin: 10px 0px">
              <el-tag type="warning"> {{ info }} </el-tag>
            </div>

            <el-input
              v-model="className"
              style="margin: 10px 0px; width: 350px"
            >
              <template slot="prepend">班级名称</template>
            </el-input>
            <div>
              <el-button @click="fetch" type="danger">偷取班级数据</el-button>
            </div>
          </div>
          <div class="sign-form">
            <div>
              <el-tag> 👇生成签到表 </el-tag>
              <el-tag type="info">
                <a href="/学生签到表-template.xlsx" download
                  >点击下载学员签到表模板文件</a
                >
              </el-tag>
            </div>
            <div>
              <el-upload
                class="upload-demo"
                drag
                action=""
                :on-error="fileChangeSign"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>

                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="teacher-feedback">
            <div class="">
              <div>
                <el-tag>👇生成教师反馈表</el-tag>
                <el-tag type="info">
                  <a href="/学员打分表-template.xlsx" download
                    >点击下载学员打分表模板文件</a
                  >
                </el-tag>
              </div>
            </div>
            <div>
              <el-upload
                class="upload-demo"
                drag
                action=""
                :on-error="fileChange"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>

                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { tagList } from "@/components/class-form/config";
import { UploadFile, ElNotification, dayjs } from "element-plus";
import { getCRMClassList, getCRMCourseDetail } from "@/api/api";
import Excel from "exceljs";
import { saveAs } from "file-saver";
const className = ref("");

const courseId = ref("");
const courseDetail = ref<any>({});
const teacherCourseMap = ref<any>({});
async function getCourseDetail() {
  const res = await getCRMCourseDetail(courseId.value);
  courseDetail.value = res;
  teacherCourseMap.value = courseDetail.value.class_items.map((item: any) => {
    return {
      teacher: item.course_schedulings[0].teacher_name,
      course: item.name,
    };
  });
  /**
   * class_adviser_name // 班主任名字
   * product_name  // =班级编号
   * product_short_name // 班级中文名字
   *
   *
   */
  ElNotification({
    title: "Tips",
    message: "Fetch data successfully",
    type: "success",
  });
}
async function fetch() {
  const res = await getCRMClassList(className.value);
  courseId.value = res.list[0].id;

  await getCourseDetail();
}

/**
 * 学员信息表fn
 * @param e
 * @param file
 */
async function fileChangeInfo(e: Error, file: UploadFile) {
  const stream = file?.raw?.stream();

  const workbook = new Excel.Workbook();

  // 读取文件
  const res = await workbook.xlsx.read(stream);
  // 获取第一个工作
  const worksheet = workbook.getWorksheet("学生信息表");

  const refundStudentList = courseDetail.value.refund_student_names
    ? courseDetail.value.refund_student_names.split(",")
    : [];

  const vaildMemberList = courseDetail.value.students
    .map((stu: any) => {
      const isRefunded = refundStudentList.find(
        (name: any) => name === stu.student.name
      );
      if (!isRefunded) {
        return {
          name: stu.student.name,
          consultant: stu.student.present_owner_name,
          classNo: courseDetail.value.product_name,
          CA: courseDetail.value.class_adviser_name,
          title: `${dayjs(courseDetail.value.start).format("Y")}${
            courseDetail.value.product_short_name
          }-${courseDetail.value.product_name}`,
        };
      }
    })
    .filter((item: any) => item);

  const excelSpace = [
    ["B3", "D3", "E3", "G3"],
    ["B4", "D4", "E4", "G4"],
    ["B5", "D5", "E5", "G5"],
    ["B6", "D6", "E6", "G6"],
    ["B7", "D7", "E7", "G7"],
    ["B8", "D8", "E8", "G8"],
    ["B9", "D9", "E9", "G9"],
    ["B10", "D10", "E10", "G10"],
    ["B11", "D11", "E11", "G11"],
    ["B12", "D12", "E12", "G12"],
  ];
  const data = [];
  worksheet!.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const rowData = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.address === "C1") {
        cell.value = `${dayjs(courseDetail.value.start).format("M-D")}${
          courseDetail.value.product_short_name
        }.${courseDetail.value.product_name}`;
      }

      vaildMemberList.forEach((member: any, index: number) => {
        if (cell.address === excelSpace[index][0]) {
          cell.value = member.name;
        }
        if (cell.address === excelSpace[index][1]) {
          cell.value = member.CA;
        }
        if (cell.address === excelSpace[index][2]) {
          cell.value = member.consultant;
        }
        if (cell.address === excelSpace[index][3]) {
          cell.value = member.classNo;
        }
      });
    });
    data.push(rowData);
  });
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: "" });
    saveAs(blob, `${courseDetail.value.product_name}学员信息表.xlsx`);
  });
}

/**
 * 学员签到表fn
 * @param e
 * @param file
 */
async function fileChangeSign(e: Error, file: UploadFile) {
  const stream = file?.raw?.stream();

  const workbook = new Excel.Workbook();

  // 读取文件
  const res = await workbook.xlsx.read(stream);
  // 获取第一个工作
  const worksheet = workbook.getWorksheet(1);
  const memberList = courseDetail.value.valid_student_names.split(",");
  const dayList = courseDetail.value.course_schedulings.map((item: any) => {
    return dayjs(item.start).format("YYYY-MM-DD");
  });

  const excelSpace = [
    "B4",
    "E4",
    "H4",
    "B16",
    "E16",
    "H16",
    "B28",
    "E28",
    "H28",
    "B41",
    "E41",
    "H41",
    "B54",
    "E54",
    "H54",
    "B65",
    "E65",
    "H65",
  ];

  const data = [];
  worksheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const rowData = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.address === "D1") {
        cell.value = `${courseDetail.value.product_short_name}-${courseDetail.value.product_name}`;
      }
      if (cell.address === "A3") {
        cell.value = courseDetail.value.product_name;
      }
      if (cell.address === "B3") {
        cell.value = courseDetail.value.class_adviser_name;
      }
      if (cell.address === "D3") {
        cell.value = memberList.length;
      }

      // 处理日期
      [...new Set(dayList.sort())].forEach((item: any, index) => {
        if (cell.address === excelSpace[index]) {
          cell.value = item;
        }
      });

      // 处理学生名字
      const excelNameSpace = [
        ["A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
        ["A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27"],
        ["A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39"],
        ["A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52"],
        ["A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63", "A64"],
        ["A67", "A68", "A69", "A70", "A71", "A72", "A73", "A74", "A75"],
      ];
      excelNameSpace.forEach((item, index) => {
        memberList.forEach((member: any, no: any) => {
          if (cell.address === excelNameSpace[index][no]) {
            cell.value = member;
          }
        });
      });
    });
    data.push(rowData);
  });
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: "" });
    saveAs(blob, `${courseDetail.value.product_name}签到表.xlsx`);
  });
}

async function fileChange(e: Error, file: UploadFile) {
  const stream = file?.raw?.stream();

  const workbook = new Excel.Workbook();

  // 读取文件
  const res = await workbook.xlsx.read(stream);
  // 获取第一个工作
  const worksheet = workbook.getWorksheet(1);

  const data = [];
  worksheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const rowData: Record<string, any> = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.address === "C4") {
        // 学生姓名
        cell.value = "";
      }

      if (cell.address === "E4") {
        // 课程名称
        cell.value = courseDetail.value.product_name;
      }
      if (cell.address === "E5") {
        // 上课时间
        cell.value = `${dayjs(courseDetail.value.start).format(
          "YYYY-MM-DD"
        )}-${dayjs(courseDetail.value.end).format("YYYY-MM-DD")}`;
      }
      if (cell.address === "J5") {
        // 学服姓名
        cell.value = courseDetail.value.class_adviser_name;
      }

      const cellList = [
        {
          teacher: "C7",
          course: "F7",
        },
        {
          teacher: "C14",
          course: "F14",
        },
        {
          teacher: "C21",
          course: "F21",
        },
        {
          teacher: "C28",
          course: "F28",
        },
        {
          teacher: "C35",
          course: "F35",
        },
      ];

      teacherCourseMap.value.forEach((item: any, index: number) => {
        if (cell.address === cellList[index].teacher) {
          cell.value = item.teacher;
        }
        if (cell.address === cellList[index].course) {
          cell.value = item.course;
        }
      });

      rowData[cell.value as any] = cell.value;
    });
    data.push(rowData);
  });
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: "" });
    saveAs(blob, `${courseDetail.value.product_name}教师反馈表.xlsx`);
  });
}
</script>

<style lang="less" scoped>
.class-form {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px;
  .border-card-mine {
    width: 100%;
  }
  .download-area {
    width: 100%;

    // overflow: auto;
    display: flex;
  }

  .teacher-feedback {
    flex: 1;
  }
  .sign-form {
    flex: 1;
  }
  .info-form {
    flex: 1;
  }

  .upload-demo {
    width: 350px;
  }
}
</style>
