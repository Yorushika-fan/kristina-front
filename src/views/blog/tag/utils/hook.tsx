import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../hooks";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { deleteTag, getTagList } from "@/api/blog/tag";

export function useRole() {
  const form = reactive({
    name: "",
    createBy: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const selectList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left",
      hide: false
    },
    {
      label: "标签id",
      prop: "id",
      minWidth: 100,
      hide: true
    },
    {
      label: "标签名",
      prop: "name",
      minWidth: 120
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 150
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime"
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要将<strong>${
        row.name
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.status === 0 ? "存为草稿" : "发布"
      }</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function multiDeteleHandle() {
    const tagIdList = selectList.value.map(item => item.id);
    if (tagIdList.length <= 0) {
      message(`请至少选择一个`, { type: "info" });
      return;
    }
    addDialog({
      title: "您确定要删除选中的数据吗",
      contentRenderer: () => <p>删除后的数据无法恢复，确定要删除吗</p>,
      beforeSure: async (done, { options, index }) => {
        await deleteTag(tagIdList).then(res =>
          message(`${res.msg}`, { type: "success" })
        );
        onSearch();
        done(); // 需要关闭把注释解开即可
      }
    });
  }
  async function handleDelete(row) {
    await deleteTag([row.id]).then(res =>
      message(`${res.msg}`, { type: "success" })
    );
    onSearch();
  }

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    selectList.value = [];
    selectList.value.push(...val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getTagList({
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    })
    dataList.value = data.rows.filter(
      item =>
        (form.name == "" ? item : item.name.includes(form.name)) &&
        (form.createBy == "" ? item : item.createBy.includes(form.createBy))
    );
    pagination.total = data.total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}标签`,
      props: {
        formInline: {
          name: row?.name ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了标签名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    multiDeteleHandle,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
