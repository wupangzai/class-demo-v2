import { ref } from "vue";
import dayjs from "dayjs";
import { API, APICONST } from "@/api";
import { CONST, UTILS } from "@/common";

export async function useMetaBaseData(
  CAName: CONST.Name,
  date: string = APICONST.metaBaseMap.NEXTDAY,
  useCRMRoom = true,
  useSort = true
) {
  const value = ref<Record<any, any>[]>([{}]);
  const res = await API.getMetaBaseCourseArrange(date);

  const listAfterFilterByCA = res.filter(
    (courseItem: any) => courseItem["助教"] === CAName
  );

  const listAfterSortedByName = useSort
    ? UTILS.sortByPropertyOrder(listAfterFilterByCA, "学生/班级")
    : listAfterFilterByCA;

  const crmRoomArrangement = useCRMRoom
    ? await useCRMRoomArrangement()
    : ref([]);
  if (crmRoomArrangement.value) {
    value.value = listAfterSortedByName.map((item: any, index: number) => {
      let classroom;
      let isOnline;

      useCRMRoom &&
        crmRoomArrangement.value.forEach((crmDetail) => {
          const crmTime = `${crmDetail.start.slice(
            -8,
            -3
          )}-${crmDetail.end.slice(
            // 懒得修改屎山
            -8,
            -3
          )}`;
          const metaBaseTime = `${dayjs(item.start).format("HH:mm")}-${dayjs(
            item.end
          ).format("HH:mm")}`;

          if (
            crmDetail.object_name === item["学生/班级"] &&
            crmTime === metaBaseTime
          ) {
            classroom = crmDetail.class_room_name;
            if (!classroom && crmDetail.title.includes("远程课")) {
              isOnline = true;
            }
          }
        });
      return {
        time: `${dayjs(item.start).format("HH:mm")}-${dayjs(item.end).format(
          "HH:mm"
        )}`,
        rawStartTime: item.start,
        rawEndTime: item.end,
        subject: item["课程"],
        stuOrClass: item["学生/班级"],
        teacher: item["教师"],
        classroom,
        isOnline,
      };
    });
  }
  return value;
}

/**
 *
 * @param date YYYY-MM-DD
 * @returns
 */
export async function useCRMRoomArrangement(
  date = dayjs().add(1, "days").format("YYYY-MM-DD")
) {
  const value = ref<Record<any, any>[]>([{}]);

  const res = await API.getCRMRoomArrangement(date);

  if (res) {
    value.value = res.list;
  }
  return value;
}

export function formatPropertyAndCA(List: any, CA: string) {
  const listAfterFilterByCA = List?.filter(
    (courseItem: any) => courseItem["助教"] === CA
  );

  const listAfterSortedByName = UTILS.sortByPropertyOrder(
    listAfterFilterByCA,
    "学生/班级"
  );

  return listAfterSortedByName.map((item) => {
    return {
      time: `${dayjs(item.start).format("HH:mm")}-${dayjs(item.end).format(
        "HH:mm"
      )}`,
      subject: item["课程"],
      stuOrClass: item["学生/班级"],
      teacher: item["教师"],
    };
  });
}
