import { http } from "@/packages/axios/common";

// 获取MetaBase中的课程数据
export async function getMetaBaseCourseArrange(
  date: string,
  place = ["半海人广旗舰"]
) {
  const data = await http.get(
    "/myclass/api/public/card/422e5936-e3f1-4080-a226-e2311ab69019/query/json",
    {
      parameters: JSON.stringify([
        {
          type: "category",
          value: place,
          id: "e7ab001d-adfb-44aa-7cd3-96ee5f8d0dc2",
          target: ["variable", ["template-tag", "dept"]],
        },
        {
          type: "date/all-options",
          value: date,
          id: "953e6c0e-7467-721c-8065-fa3451526c25",
          target: ["dimension", ["template-tag", "date"]],
        },
        {
          type: "category",
          value: null,
          id: "627547e3-e078-8cd7-1c44-0038eba685e3",
          target: ["variable", ["template-tag", "stuName"]],
        },
      ]),
    }
  );

  return data;
}

interface LoginData {
  username: string;
  password: string;
}
export async function LoginToCrm(LoginData: LoginData) {
  const res = await http.postJson("/crm/api/v1/pub/login", {
    altcha:
      "eyJhbGdvcml0aG0iOiJTSEEtMjU2IiwiY2hhbGxlbmdlIjoiYWRlYThhMGJhOWM1NmZjZDRmMDczNWFhM2I4ZGZhNTE1Njg4ZTE1OTE5NWY1ZmQwMjhmYmNjZjBhOWViMDRkNiIsIm51bWJlciI6NjUwMSwic2FsdCI6ImViNzY5ZTA1MjllZGI2OWYzMWQ0ZDAyZCIsInNpZ25hdHVyZSI6ImUzMDI5N2NiYmI5Yzk4NWU4MDdiZTY0NGM1ZDVlZmYxOGU2OWIyZDRlNzUxNjkzNzljOTU4ZmU3MjAwZmJmN2MiLCJ0b29rIjo0Njd9",
    org_id: 5,
    fingerprint: "effe59682bd8dcbf0db6592bc5b546d2",
    ...LoginData,
  });

  return res;
}

// 验证token是否过期的随机接口
export async function validateToken() {
  const res = await http.get(
    "/crm/api/v1/notifications?user_id=1799&is_read=0&per_page=99&page=1",
    {}
  );
  return res;
}

/**
 *
 * @param date e.g. 2025-01-24
 */
export async function getCRMRoomArrangement(date: string) {
  const res = await http.get("/crm/api/v1/course-schedulings/all", {
    date,
    sort: "start",
    includes: [
      "classroom",
      "teacher",
      "class",
      "classItem",
      "classroomSchedule",
      "classAdviser",
    ],
    study_center_id: 17,
  });
  return res;
}

/**
 *
 * @param className 班级名称
 * @returns 一个数组
 */
export async function getCRMClassList(className: string) {
  const res = await http.get("/crm/api/v1/class-list", {
    queryValue: className,
    start_before: "",
    start_after: "",
    not_full: "",
    ["study_centers[]"]: 17,
    large_than_three: false,
    order: "start_asc",
    production_type: "class",
    sort: "-created_at",
    skip_ac: true,
    page: 1,
  });

  return res;
}

export async function getCRMCourseDetail(courseId: string) {
  const res = await http.get(`/crm/api/v1/classes/${courseId}`, {
    id: courseId,
    includes: [
      "courseSchedulings",
      "classStudents",
      "classItems.product",
      "classItems.courseSchedulings",
    ],
  });

  return res;
}

// 获取学生信息，如id
export async function getStudentInfo(studentName: string): Promise<any> {
  const res = await http.get("/crm/api/v1/students.json", {
    queryValue: studentName,
  });

  return res;
}

// 获取班级信息
export async function getClassInfo(
  classNo: string,
  production_type = "class"
): Promise<any> {
  const res = await http.get("/crm/api/v1/class-names", {
    production_type,
    queryValue: classNo,
  });

  return res;
}

// 获取反馈列表
export async function getFeedBack(
  id: string,
  isClass: boolean,
  start: string,
  end: string
) {
  const res = await http.get("/crm/api/v1/course-schedulings", {
    current: 1,
    pageSize: 20,
    [isClass ? "classId" : "student_id"]: id,
    start,
    end,
    sort: "start",
    page: 1,
    per_page: 20,
    includes: [
      "teacher",
      "classStudent",
      "classItem",
      "studyCenter",
      "classroom",
      "courseStudent",
      "courseSignin",
      "CourseRecords",
      "",
    ],
    no_preview: true,
  });
  return res;
}

// 获取具体反馈内容 markdown
export async function getFeedBackDetailContent(id: number) {
  const res = await http.get(`/crm/api/v1/course-schedulings/${id}`, {
    id,
    includes: [
      "teacher",
      "studyCenter",
      "classroom",
      "courseSignin",
      "teachingRecord",
    ],
  });
  return res;
}
