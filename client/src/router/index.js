import store from '@/store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import PageNotFound from '@/views/errors/PageNotFound';
import Home from '@/views/Home.vue';
import ProfileSettings from "@/views/profile/ProfileSettings";
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
        path: '/reset-password/:userId/:token',
        name: 'reset-password',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next(from);
            }
            next();
        },
    },
    {
        path: '/profile-settings',
        name: 'profile-settings',
        component: ProfileSettings,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
            }
            next({ name: 'login' });
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

