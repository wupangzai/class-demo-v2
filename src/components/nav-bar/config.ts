import {
  Operation,
  Position,
  Document,
  OfficeBuilding,
  Money,
  UserFilled,
  Search,
  Edit,
} from "@element-plus/icons-vue";
const menu = [
  {
    index: "1",
    component: "el-sub-menu",
    icon: Operation,
    title: "教室表相关",
    subMenu: [
      [
        {
          index: "1-1",
          title: "教室表下载",
        },
        {
          index: "1-2",
          title: "Todo...",
        },
      ],
    ],
  },
  {
    index: "2",
    component: "el-menu-item",
    icon: Position,
    title: "上课提醒",
    subMenu: [],
  },
  {
    index: "3",
    component: "el-menu-item",
    icon: Document,
    title: "课程反馈",
    subMenu: [],
  },
  {
    index: "4",
    component: "el-menu-item",
    icon: OfficeBuilding,
    title: "课表概览",
    subMenu: [],
  },
  {
    index: "5",
    component: "el-menu-item",
    icon: Money,
    title: "绩效统计",
    subMenu: [],
  },
  {
    index: "6",
    component: "el-menu-item",
    icon: UserFilled,
    title: "CRM",
    subMenu: [],
  },
  {
    index: "7",
    component: "el-menu-item",
    icon: Search,
    title: "资料",
    subMenu: [],
  },
  {
    index: "8",
    component: "el-menu-item",
    icon: Edit,
    title: "Todo List",
    subMenu: [],
  },
];

export default menu;
