import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import { PageResult, Result } from "../common";

type Link = {
  id: number;
  name: string;
  adressUrl: string;
  logoUrl: string;
  description: string;
  status: number;
  createBy: string;
  crateTime: Date;
};

/**
 * 分页获取标签
 * @param params
 * @returns
 */
export const getLinkList = (params?: object) => {
  return http.request<PageResult<Link>>("get", baseUrlApi("link"), {
    params
  });
};

export const deleteLink = (data?: object) => {
  return http.request<Result<string>>("delete", baseUrlApi("link"), {
    data
  });
};
