export type Name =
  | "吴彬"
  | "董洁"
  | "王南飞"
  | "刘维倩"
  | "王淑贤"
  | "江玥彤"
  | "邓志豪"
  | "test";

export interface CANameMap {
  CName: Name;
  EName: string;
}

export const defaultCA: CANameMap = {
  CName: "董洁",
  EName: "Jade",
};
export const CANameMapList: CANameMap[] = [
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
    CName: "江玥彤",
    EName: "Aurora",
  },
];
