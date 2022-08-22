import axios from 'axios';
import 'font-awesome-animation/css/font-awesome-animation.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/reset.css';
import './assets/css/style.css';
import router from './router';
import store from './store';
import VueGoogleMaps from '@fawmi/vue-google-maps'

// axios configurations
axios.defaults.baseURL = 'http://localhost:5000/api/v1';

// vuex configuration
require('@/store/subscriber');

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(fas);

store
    .dispatch('attempt', localStorage.getItem('token'))
    .then(() => {
        createApp(App)
            .component('font-awesome-icon', FontAwesomeIcon)
            .use(store)
            .use(router)
            .use(VueGoogleMaps, {
                load: {
                    key: 'AIzaSyBUQDNOKEfS5-kuJXZ4UOTSTvRMNCxKNlA',
                },
            })
            .mount('#app');
    })
    .catch((err) => console.log(err));
