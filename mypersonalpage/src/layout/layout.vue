<template>
    <div class="default-layout">
    <Navigator /> <!-- 公共导航栏 -->
    <LanguageSwitcher /> <!-- 语言切换组件 -->
    <main class="content-wrapper">
      <router-view /> <!-- 这里将渲染当前路由对应的页面级组件 (HomePage 或 AboutPage) -->
    </main>
    <footer class="app-footer">
      <font color="#8e44ad">2025 Loch's Personal Blog</font>
    </footer>
  </div>
</template>

<script setup lang="ts">
    import Navigator from '@/components/navigator.vue';
    import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
</script>