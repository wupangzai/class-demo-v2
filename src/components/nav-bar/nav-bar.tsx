import { ref, defineComponent, Fragment } from "vue";

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
        <ElMenu collapse={true} class="custom-menu">
          {MenuConfig.map((menu) => {
            if (menu.component === "el-sub-menu") {
              return (
                <ElSubMenu
                  index={menu.index}
                  v-slots={{
                    title: () => (
                      <Fragment>
                        <ElIcon>
                          <menu.icon />
                        </ElIcon>
                        <span>{menu.title}</span>
                      </Fragment>
                    ),
                  }}
                >
                  {menu.subMenu.length &&
                    menu.subMenu.map((subMenuGroup) => (
                      <ElMenuItemGroup
                        v-slots={{
                          title: () => <div>Group one</div>,
                        }}
                      >
                        {subMenuGroup.map((menuItem) => (
                          <ElMenuItem index={menuItem.index}>
                            {menuItem.title}
                          </ElMenuItem>
                        ))}
                      </ElMenuItemGroup>
                    ))}
                </ElSubMenu>
              );
            } else if (menu.component === "el-menu-item") {
              return (
                <ElMenuItem
                  index={menu.index}
                  v-slots={{ title: () => menu.title }}
                >
                  <el-icon>
                    <menu.icon />
                  </el-icon>
                </ElMenuItem>
              );
            }
          })}
        </ElMenu>
      );
    };
  },
});
