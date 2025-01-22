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
