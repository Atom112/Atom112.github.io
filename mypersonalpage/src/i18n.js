// src/i18n.js
import { createI18n } from 'vue-i18n';

// 1. 定义支持的语言和默认语言
export const SUPPORTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

// 创建 i18n 实例，初始时只加载通用消息，或不加载任何页面特定消息
// 我们可以先加载 common 消息，因为它会在每个页面都用到
// 或者 initialMessages 也可以是空对象 {}
const initialMessages = {};
// 尝试同步加载common，如果需要，也可以用import()异步加载
try {
  initialMessages.en = require('./locales/en/common.json');
  initialMessages.zh = require('./locales/zh/common.json');
} catch (e) {
  console.warn("Could not load common messages synchronously:", e);
  // fallback to empty common messages if required files are not found
  initialMessages.en = {};
  initialMessages.zh = {};
}

const i18n = createI18n({
  locale: DEFAULT_LOCALE, // 默认语言
  fallbackLocale: 'en',  // 备用语言
  messages: initialMessages,
  legacy: false, // Vue 3 requires legacy: false
  globalInjection: true, // 允许在组件中使用 $t 等
});

// 用于存储已加载的语言文件，避免重复加载
const loadedLocales = {}; // { en: ['common', 'home'], zh: ['common'] }

/**
 * 加载并设置当前语言的翻译消息。
 * 如果该语言的某个页面消息已经加载过，则直接使用。
 * 如果未加载过，则动态导入并添加到 i18n 实例中。
 * @param {string} lang - 目标语言 (e.g., 'en', 'zh')
 * @param {string} pageName - 页面名称 (e.g., 'home', 'about')
 * @returns {Promise<void>}
 */
export async function loadLocaleMessages(lang, pageName) {
  // 检查语言是否已加载
  if (!loadedLocales[lang]) {
    loadedLocales[lang] = [];
  }

  // 如果该页面的翻译已经加载过，则直接返回
  if (loadedLocales[lang].includes(pageName)) {
    return;
  }

  // 动态导入所需语言的页面级翻译文件
  try {
    const messages = await import(`./locales/${lang}/${pageName}.json`);

    // 将消息设置到 i18n 实例中
    // 'messages.default' 是因为 ES Module 动态导入 JSON 文件时，内容会被包裹在 default 属性中
    i18n.global.setLocaleMessage(lang, {
      ...i18n.global.getLocaleMessage(lang), // 保留已有的该语言消息 (如 common.json)
      ...messages.default                   // 添加新的页面消息
    });
    // 标记该页面的翻译已加载
    loadedLocales[lang].push(pageName);
    console.log(`Loaded ${lang}/${pageName}.json messages.`);
  } catch (e) {
    console.error(`Failed to load ${lang}/${pageName}.json messages:`, e);
    // 可选：在加载失败时设置一个空对象，防止后续错误
    i18n.global.setLocaleMessage(lang, {
      ...i18n.global.getLocaleMessage(lang),
      [pageName]: {} // 或者其他错误处理
    });
  }
}

// 导出 i18n 实例和加载函数
export default i18n;