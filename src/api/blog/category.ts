import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import { PageResult, Result } from "../common";

type Category = {
  id: number;
  name: string;
  createBy: string;
  createTime: Date;
};

/**
 * 分页获取文章
 * @param params
 * @returns
 */
export const getCategoryList = (params?: object) => {
  return http.request<PageResult<Category>>("get", baseUrlApi("category"), {
    params
  });
};

export const deleteCategory = (data?: object) => {
  return http.request<Result<string>>("delete", baseUrlApi("category"), {
    data
  });
};

export const getAllCategory = (data?: object) => {
  return http.request<Result<Array<Category>>>(
    "get",
    baseUrlApi("category/all")
  );
};
