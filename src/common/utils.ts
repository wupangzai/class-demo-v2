import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

/**
 * 传入一个对象数组，按照指定的property，排序，有相同的property则放到第一次出现该property的位置
 */
export function sortByPropertyOrder(
  arr: Record<string, any>[],
  property: string
): any[] {
  const groups = arr.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] = acc[key] || [];
    acc[key].push(obj);
    return acc;
  }, {});

  return Object.keys(groups).reduce((acc, key) => {
    return acc.concat(groups[key]);
  }, []);
}

export type option = "thisweek" | "nextweek" | "other";
const weekMap: Record<string, string> = {
  Monday: "周一",
  Tuesday: "周二",
  Wednesday: "周三",
  Thursday: "周四",
  Friday: "周五",
  Saturday: "周六",
  Sunday: "周日",
};
export function getWeekDates(
  option: option = "thisweek",
  specificDate?: string[]
) {
  let startOfWeek;

  if (specificDate) {
    // 如果传入具体日期，获取该日期所在周的周一
    // startOfWeek = dayjs(specificDate).isoWeekday(1);
    return getDatesWithWeekdays(specificDate);
  } else if (option === "nextweek") {
    // 获取下周的周一
    startOfWeek = dayjs().isoWeekday(1).add(1, "week");
  } else {
    // 默认是本周的周一
    startOfWeek = dayjs().isoWeekday(1);
  }

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = startOfWeek?.add(i, "day");
    weekDates.push({
      date: date?.format("YYYY-MM-DD"), // 日期
      dayOfWeek: weekMap[date?.format("dddd")], // 周几（比如 Monday, Tuesday）
    });
  }

  return weekDates;
}

function getDatesWithWeekdays(dateRange: string[]) {
  // 获取起始日期和结束日期
  const startDate = dayjs(dateRange[0]);
  const endDate = dayjs(dateRange[1]);

  const result = [];

  // 循环生成从起始日期到结束日期的所有日期
  for (
    let currentDate = startDate;
    currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day");
    currentDate = currentDate.add(1, "day")
  ) {
    result.push({
      date: currentDate.format("YYYY-MM-DD"), // 格式化日期为 'YYYY-MM-DD'
      dayOfWeek: weekMap[currentDate.format("dddd")], // 获取周几
    });
  }

  return result;
}

export function isValidJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
