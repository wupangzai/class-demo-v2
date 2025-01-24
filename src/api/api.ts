import { http } from "@/packages/axios/common";

// 获取MetaBase中的课程数据
export async function getMetaBaseCourseArrange(
  date: string,
  place?: ["半海人广旗舰"]
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
