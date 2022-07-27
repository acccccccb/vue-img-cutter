import { createI18n } from 'vue-i18n';
import zhCn from './lang/zh-CN.js';
import enUs from './lang/en-US.js';

export default createI18n({
    locale: 'zh-CN',
    messages: {
        'en-US': enUs,
        'zh-CN': zhCn,
    },
});
