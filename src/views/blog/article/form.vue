<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "",
    category: "",
    status: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="文章标题" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入文章标题"
      />
    </el-form-item>

    <el-form-item label="文章分类" prop="category">
      <el-input
        v-model="newFormInline.category"
        clearable
        placeholder="请选择"
      />
    </el-form-item>

    <el-form-item label="标签">
      <el-input
        v-model="newFormInline.status"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
