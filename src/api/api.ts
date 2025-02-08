import { http } from "@/packages/axios/common";

// 获取MetaBase中的课程数据
export async function getMetaBaseCourseArrange(
  date: string,
  place = ["半海人广旗舰"]
) {
  const data = await http.get("/myclass/json", {
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
  });

  return data;
}

interface LoginData {
  username: string;
  password: string;
}
export async function LoginToCrm(LoginData: LoginData) {
  const res = await http.postJson("/crm/pub/login", {
    org_id: 5,
    ...LoginData,
  });

  return res;
}

// 验证token是否过期的随机接口
export async function validateToken() {
  const res = await http.get(
    "/crm/notifications?user_id=1799&is_read=0&per_page=99&page=1",
    {}
  );
  return res;
}

/**
 *
 * @param date e.g. 2025-01-24
 */
export async function getCRMRoomArrangement(date: string) {
  const res = await http.get("/crm/course-schedulings/all", {
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
  const res = await http.get("/crm/class-list", {
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
  const res = await http.get(`/crm/classes/${courseId}`, {
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
