<script setup lang="ts">
import { ref, watch } from "vue";
import ReAnimateSelector from "@/components/ReAnimateSelector";

defineOptions({
  name: "AnimateCss"
});

const animate = ref("");

watch(animate, () => {
  console.log("animate", animate.value);
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          <el-link
            href="https://animate.style/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            animate.css
          </el-link>
          选择器
        </span>
      </div>
    </template>
    <ReAnimateSelector v-model="animate" class="!w-[200px]" />
  </el-card>
</template>
