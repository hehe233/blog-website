import { createApp } from 'vue';
import App from './App.vue';
import { router} from './plugins/router';

import '@/assets/scss/reset.scss';
import '@/assets/scss/icon.scss';
import '@/assets/scss/animation.scss';
import '@/assets/scss/theme.scss';
import '@/assets/scss/common.scss';

const app = createApp(App);
app.use(router);
app.mount('#root');