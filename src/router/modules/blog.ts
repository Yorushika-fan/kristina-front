import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";

export default {
  path: "/blog",
  redirect: "/blog/article",
  meta: {
    icon: "ri:list-check",
    title: $t("menus.hsblogManagement"),
    rank: list
  },
  children: [
    {
      path: "/blog/article",
      name: "BlogArticle",
      component: () => import("@/views/blog/article/index.vue"),
      meta: {
        icon: "ri:file-text-fill",
        title: $t("menus.hsArticleManagement"),
        showParent: true
      }
    },
    {
      path: "/blog/category",
      name: "category",
      component: () => import("@/views/blog/category/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: $t("menus.hsCategoryManagement"),
        showParent: true
      }
    },
    {
      path: "/blog/tag",
      name: "tag",
      component: () => import("@/views/blog/tag/index.vue"),
      meta: {
        icon: "ri:price-tag-3-line",
        title: $t("menus.hsTagManagement"),
        showParent: true
      }
    },
    {
      path: "/blog/link",
      name: "link",
      component: () => import("@/views/blog/link/index.vue"),
      meta: {
        icon: "ri:links-fill",
        title: $t("menus.hsLinkManagement"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
