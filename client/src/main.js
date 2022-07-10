import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/reset.css';
import './assets/css/style.css';
import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://localhost:5000/api/v1';

createApp(App).use(store).use(router).mount('#app');
