import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import { PageResult, Result } from "../common";

type Tag = {
  id: number;
  name: string;
  createBy: string;
  crateTime: Date;
};

/**
 * 分页获取标签
 * @param params
 * @returns
 */
export const getTagList = (params?: object) => {
  return http.request<PageResult<Tag>>("get", baseUrlApi("tag"), {
    params
  });
};

export const deleteTag = (data?: object) => {
  return http.request<Result<string>>("delete", baseUrlApi("tag"), {
    data
  });
};
