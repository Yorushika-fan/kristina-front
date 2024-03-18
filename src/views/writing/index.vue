<template>
  <div class="markdow-page bg-[#fff]">
    <div class="flex items-center justify-between">
      <div class="flex w-1/2">
        <el-select
          v-model="article.categoryName"
          class="m-2"
          placeholder="分类"
          size="large"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="tags"
          class="m-2"
          placeholder="标签"
          collapse-tags
          multiple
          size="large"
        >
          <el-option
            v-for="item in tagsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="pr-8">
        <el-button
          class="ml-2"
          type="primary"
          @click="saveArticle"
          v-if="article.status === 1"
        >
          取消发布
        </el-button>
        <el-button
          class="mr-2"
          type="primary"
          @click="postArticle"
          v-if="article.status !== 1"
        >
          存草稿
        </el-button>
        <el-button class="mr-2" type="primary" @click="postArticle">
          发布文章
        </el-button>
      </div>
    </div>
    <el-input v-model="article.title" size="large" placeholder="请输入标题" />
    <Editor
      :locale="zh"
      :upload-images="handleUploadFile"
      :value="value"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "writing"
});
import { reactive, toRefs, markRaw, onMounted, Ref, watch } from "vue";
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight"; // 代码高亮
import frontmatter from "@bytemd/plugin-frontmatter"; // 解析前题
import {getAllCategory} from '@/api/blog/category'
// import mediumZoom from "@bytemd/plugin-medium-zoom"; // 缩放图片
import breaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import "bytemd/dist/index.css";
// import "juejin-markdown-themes/dist/juejin.min.css"; // 掘金同款样式
import { ref } from "vue";
// import { getAllTags } from '@/api/blog/tag'
// import { getCategorys } from '@/api/blog/category'
// import router from '@/router/index'
// import { getArticleDetails } from '@/api/blog/article'
// // import { ElLoading } from 'element-plus'
// import { uploadAvatar } from '@/api/common'

const title = ref("");
const tags: Ref<Array<string>> = ref([]);
const tagsOptions: Array<{ value: number; label: string }> = reactive([]);
const categoryOptions: Array<{ value: number; label: string }> = reactive([]);

const article = ref({
  id: -1,
  title: "",
  url: "",
  content: "",
  categoryId: -1,
  categoryName: "",
  tags: [{ id: -1, name: "" }],
  updateTime: new Date(),
  articleViews: -1,
  status: -1
});

// watch(router.currentRoute, () => {
//   router.go(0)
// })
// onMounted(async () => {
//   console.log(router.currentRoute.value.fullPath)
//   const articleId = Number(router.currentRoute.value.params.id)

//   if (articleId !== -1) {
//     // const loadingInstance = ElLoading.service({
//     //   fullscreen: false,
//     //   text: '加载中...',
//     // })
//     const articleData = await getArticleDetails(articleId)
//     article.value = articleData.result
//     let taglist: Array<string> = []

//     articleData.result.tags.forEach((item) => {
//       taglist.push(item.name)
//     })
//     tags.value.push(...taglist)
//     state.value = articleData.result.content
//     // loadingInstance.close()
//   } else {
//     state.value = ''
//   }

//   let tags1 = await getAllTags()
//   let categorys2 = await getCategorys()
//   categoryOptions.push(
//     ...categorys2.result.map((item) => ({ value: item.id, label: item.name })),
//   )
//   tagsOptions.push(
//     ...tags1.result.map((item) => ({ value: item?.id, label: item.name })),
//   )
// })

// 内容控件所支持的特殊功能插件列表，如：支持代码高亮、图片优化等。
const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  // mediumZoom(),
  breaks()
  //
];
const categoryList = getAllCategory().then(
  res => res.data
)
categoryOptions.push()
const state = reactive({
  value: article.value.content,
  plugins: markRaw(pluginsList),
  zh: zhHans
});
const { value, plugins, zh } = toRefs(state);
const handleChange = (val: string) => {
  state.value = val;
};
const handleUploadFile = async (files: any) => {
  let fromData = new FormData();
  fromData.append("file", files[0]);
  const res = 111;
  console.log(res);
  return [
    {
      title: files[0].name,
      url: 111
    }
  ];
};

const saveArticle = () => {
  console.log("saveArticle");
};

const postArticle = () => {
  console.log("posetArticle");
};
</script>
<style lang="scss" scoped>
.markdow-page {
  width: 100%;
  height: 100vh;
  :deep() {
    .bytemd {
      height: calc(100vh - 200px);
    }
  }
}
</style>
