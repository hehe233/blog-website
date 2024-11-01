import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './plugins/router';

createApp(App).use(router).mount('#root');
