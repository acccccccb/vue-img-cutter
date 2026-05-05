import { createI18n } from 'vue-i18n';
import zhCn from './lang/zh-CN';
import enUs from './lang/en-US';

export const i18n = createI18n({
  locale: 'zh-CN',
  legacy: false, // Vue 3 recommend setting legacy to false
  messages: {
    'en-US': enUs,
    'zh-CN': zhCn,
  },
});
