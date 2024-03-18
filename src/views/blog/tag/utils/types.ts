// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 标签名字 */
  name: string;
  /** 创建人 */
  createBy: string;

}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
