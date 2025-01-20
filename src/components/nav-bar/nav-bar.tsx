import { defineComponent, Fragment, onMounted, ref, computed } from "vue";
import { useRouter, RouteLocationRaw } from "vue-router";

import MenuConfig from "@/components/nav-bar/config";
import {
  ElMenu,
  ElSubMenu,
  ElIcon,
  ElMenuItemGroup,
  ElMenuItem,
} from "element-plus";
import { CaretRight, CaretLeft } from "@element-plus/icons-vue";

import "./nav-bar.less";

export default defineComponent({
  name: "NavBar",

  setup() {
    //  Todo  use ref to replace dom operation
    const menuRef = ref<HTMLElement | null>(null);
    let menuHeight = ref("0px");
    const panelStyle = computed(() => {
      return {
        height: menuHeight.value + "px",
      };
    });

    // icon --control collapse
    const collapse = ref(false);
    const iconStyle = computed(() => {
      console.log(collapse.value);
      return {
        marginLeft: collapse.value ? "-8px" : "-13px",
      };
    });

    function toggleMenu() {
      collapse.value = !collapse.value;
    }

    // handle router
    const router = useRouter();
    function changeRouter(path: RouteLocationRaw) {
      router.push(path);
    }

    onMounted(() => {
      const ele = document.querySelector(".custom-menu");
      menuHeight.value = ele!.clientHeight + "px";
      // if (menuRef.value) {
      //   console.log(menuRef.value.clientHeight);
      // }
    });

    return () => {
      return (
        <Fragment>
          <ElMenu
            collapse={collapse.value}
            class="custom-menu"
            default-active="1-1"
            ref={menuRef}
          >
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
                            <ElMenuItem
                              {...menuItem}
                              onclick={() => changeRouter(menuItem.path)}
                            >
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
                    {...menu}
                    v-slots={{ title: () => menu.title }}
                    onclick={() => changeRouter(menu.path)}
                  >
                    <el-icon>
                      <menu.icon />
                    </el-icon>
                  </ElMenuItem>
                );
              }
            })}
          </ElMenu>
          <div style={{ ...panelStyle.value }} class="menu-panel-control">
            <el-icon
              size={20}
              color={"#DCDFE6"}
              class="control-icon"
              onclick={() => toggleMenu()}
              style={{ ...iconStyle.value }}
            >
              {collapse.value ? <CaretRight /> : <CaretLeft />}
            </el-icon>
          </div>
        </Fragment>
      );
    };
  },
});
