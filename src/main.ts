import { createApp } from 'vue';
import App from './App.vue';
import router from './core/router';
import store from './core/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
