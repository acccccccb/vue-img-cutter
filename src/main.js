import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n/index.js';
import { useI18n } from 'vue-i18n';

const app = createApp(App);
app.use(i18n);
app.mount('#app');
app.config.globalProperties.$t = useI18n;
app.config.globalProperties.i18n = i18n;
