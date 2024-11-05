import { createApp } from 'vue';
import App from './App.vue';
import { router} from './plugins/router';
import FontIcon from './plugins/icon';
import '@/assets/scss/index.scss';

const app = createApp(App);
app.use(FontIcon);
app.use(router);
app.mount('#root');