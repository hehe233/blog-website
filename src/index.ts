import { createApp } from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { router } from './plugins/router';
import { install } from './plugins/message';
import App from './App.vue';

import '@/assets/scss/reset.scss';
import '@/assets/scss/icon.scss';
import '@/assets/scss/animation.scss';
import '@/assets/scss/theme.scss';
import '@/assets/scss/common.scss';

const pinia = createPinia();

const app = createApp(App);
app.use(PiniaVuePlugin);
app.use(pinia);
app.use(router);
app.use(install);
app.mount('#root');