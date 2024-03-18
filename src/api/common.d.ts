type Result<T> = {
  code: number;
  msg: string;
  data?: T;
};

type Page<T> = {
  total: number;
  rows: Array<T>;
};

type PageResult<T> = {
  code: number;
  msg: string;
  data: Page<T>;
};

export { Result, PageResult };
