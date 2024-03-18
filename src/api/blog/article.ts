import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import { PageResult, Result } from "../common";

type Article = {
  id: number;
  title: string;
  url: string;
  content: string;
  categoryId: number;
  categoryName: string;
  tag: Array<{ id: number; name: string }>;
  updateTime: Date;
  articleViews: number;
  status: number;
};

/**
 * 分页获取文章
 * @param params 
 * @returns 
 */
export const getArticleList = (params?: object) => {
  return http.request<PageResult<Article>>("get", baseUrlApi("article"), {
    params
  });
};

export const deleteArticle = (data?:object) => {
  return http.request<Result<string>>("delete", baseUrlApi("article"),{data});
}
