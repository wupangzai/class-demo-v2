import { ref, defineComponent } from "vue";

import MenuConfig from "@/components/nav-bar/config";
import {
  ElMenu,
  ElSubMenu,
  ElIcon,
  ElMenuItemGroup,
  ElMenuItem,
} from "element-plus";

export default defineComponent({
  name: "NavBar",

  setup() {
    return () => {
      return (
        <ElMenu collapse={true}>
          {MenuConfig.map((menu) => {
            if (menu.component === "el-sub-menu") {
              return (
                <ElSubMenu
                  index={menu.index}
                  v-slots={{
                    title: () => (
                      <ElIcon>
                        <menu.icon />
                      </ElIcon>
                    ),
                  }}
                >
                  {menu.subMenu.length ??
                    menu.subMenu.map((subMenuGroup) => (
                      <ElMenuItemGroup
                        v-slots={{
                          title: () => <span>"Group One"</span>,
                          default: () =>
                            subMenuGroup.map((menuItem) => (
                              <ElMenuItem index={menuItem.index}>
                                {menuItem.title}
                              </ElMenuItem>
                            )),
                        }}
                      ></ElMenuItemGroup>
                    ))}
                </ElSubMenu>
              );
            }
          })}
        </ElMenu>
      );
    };
  },
});
