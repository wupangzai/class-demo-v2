export type Name = "吴彬" | "董洁" | "王南飞" | "刘维倩" | "王淑贤" | "胡庭玥";

interface CANameMap {
  CName: Name;
  EName: string;
}

export const defaultCA: CANameMap = {
  CName: "吴彬",
  EName: "Anan",
};
export const CANameMapList: CANameMap[] = [
  {
    CName: "吴彬",
    EName: "Anan",
  },
  {
    CName: "董洁",
    EName: "Jade",
  },
  {
    CName: "王南飞",
    EName: "Winnie",
  },
  {
    CName: "刘维倩",
    EName: "Quincy",
  },
  {
    CName: "王淑贤",
    EName: "Yilia",
  },
  {
    CName: "胡庭玥",
    EName: "Rebeca",
  },
];
