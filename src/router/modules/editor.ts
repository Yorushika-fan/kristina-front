import { $t } from "@/plugins/i18n";

export default {
  path: "/writing",
  redirect: "/writing/index",
  meta: {
    icon: "ep:edit",
    title: $t("menus.hseditor"),
    rank: 1
  },
  children: [
    {
      path: "/writing/index",
      name: "writing",
      component: () => import("@/views/writing/index.vue"),
      meta: {
        title: $t("menus.hseditor"),
        keepAlive: true
      }
    }
  ]
} satisfies RouteConfigsTable;
