<!-- src/components/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <button
      v-for="locale in supportedLocales"
      :key="locale.code"
      @click="switchLanguage(locale.code)"
      :class="{ 'active': currentLocale === locale.code }"
      class="lang-button"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import i18n, { SUPPORTED_LOCALES } from '@/i18n'; // 导入我们定义的 i18n 实例和支持的语言列表

const router = useRouter();
const route = useRoute();

// 支持的语言列表，包含显示名称
const supportedLocales = SUPPORTED_LOCALES.map(code => ({
  code,
  name: code === 'en' ? 'English' : (code === 'zh' ? '中文' : code) // 根据需要添加更多语言名称
}));

// 计算当前激活的语言
const currentLocale = computed(() => i18n.global.locale.value);

// 切换语言方法
const switchLanguage = async (newLocaleCode) => {
  if (currentLocale.value === newLocaleCode) {
    return; // 如果已经是当前语言，则不进行切换
  }

  // 更新 i18n 实例的语言
  i18n.global.locale.value = newLocaleCode;

  // 构建新的路由路径，保持当前路由的 name 和 params，只更新 locale 参数
  // 这样可以确保在切换语言后，用户仍然停留在当前的页面和路由参数
  const newPath = {
    name: route.name, // 当前路由的名称
    params: {
      ...route.params, // 复制所有当前路由参数
      locale: newLocaleCode // 更新语言参数
    }
  };

  // 跳转到新的路由
  // 我们不需要手动调用 loadLocaleMessages，因为路由守卫 beforeEach 会自动处理
  await router.push(newPath);
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.lang-button {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s;
}

.lang-button:hover {
  background-color: #e0e0e0;
}

.lang-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>