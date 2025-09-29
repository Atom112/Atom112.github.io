import { createRouter, createWebHistory } from 'vue-router'
import i18n,{ loadLocaleMessages ,SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/i18n'
import constructionpage from '@/view/constructionpage.vue'
import loginpage from '@/view/loginpage.vue'

const routes = [
  {
    path: '/:locale(en|zh)?', // 允许 locale 作为可选参数
    component: () => import('@/layout/layout.vue'), // 布局组件，包含导航等公共部分
    children: [
      {
        path: '', // Home page
        name: 'Home',
        component: () => import('@/view/HomePage.vue'),
        meta: { pageName: 'home' } // 标记这个页面对应的翻译文件
      }
    ]
  },
  {
    path: '/construction',
    name: 'Construction',
    component: constructionpage,
    meta: { pageName: 'construction' }
  },
  {
    path: '/login',
    name: 'Login',
    component: loginpage,
    meta: { pageName: 'login' }
  },
  // 重定向到默认语言的首页
  { path: '/:pathMatch(.*)*', redirect: `/${DEFAULT_LOCALE}` },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫，用于加载对应页面的翻译消息
router.beforeEach(async (to, from, next) => {
  // 从路由参数中获取语言，或者使用默认语言
  const lang = to.params.locale || DEFAULT_LOCALE;

  // 检查语言是否支持
  if (!SUPPORTED_LOCALES.includes(lang)) {
    next(`/${DEFAULT_LOCALE}${to.fullPath}`); // 如果不支持，重定向到默认语言
    return;
  }
  
  // 更新 i18n 实例的当前语言
  if (i18n.global.locale.value !== lang) {
      i18n.global.locale.value = lang;
  }

  // 获取页面名称，以便加载对应的翻译文件
  const pageName = to.meta.pageName;

  if (pageName && lang) {
    await loadLocaleMessages(lang, pageName);
  }

  next();
});

export default router
