import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";

export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "f7:alarm-fill",
    title: $t("menus.job"),
    rank: list
  },
  children: [
    {
      path: "/list/card",
      name: "ListCard",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: $t("menus.hsListCard"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
