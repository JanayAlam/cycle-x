import store from '@/store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import PageNotFound from '@/views/errors/PageNotFound';
import Home from '@/views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next(from);
            }
            next();
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next(from);
            }
            next();
        },
    },
    {
        path: '/:catchAll(.*)*',
        name: 'PageNotFound',
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

