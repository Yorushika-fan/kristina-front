// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 角色名称 */
  title: string;
  /** 角色编号 */
  category: string;
  /** 备注 */
  status: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
