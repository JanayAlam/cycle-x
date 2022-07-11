import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/reset.css';
import './assets/css/style.css';
import router from './router';
import store from './store';

// axios configurations
axios.defaults.baseURL = 'http://localhost:5000/api/v1';

// vuex configuration
require('@/store/subscriber');

store
    .dispatch('attempt', localStorage.getItem('token'))
    .then(() => {
        createApp(App).use(store).use(router).mount('#app');
    })
    .catch((err) => console.log(err));
