import { createApp } from 'vue';
import App from './App.vue';
import {i18n} from './i18n/index';

const app = createApp(App);
app.use(i18n);
app.mount('#app');
// @ts-ignore
app.config.globalProperties.i18n = i18n;
