import store from '@/store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import PageNotFound from '@/views/errors/PageNotFound.vue';
import Home from '@/views/Home.vue';
import Dashboard from "@/views/profile/Dashboard";
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from '@/views/profile/ChangePassword.vue';
import ChangeUserInfo from '@/views/profile/ChangeUserInfo.vue';
import EmailVerify from '@/views/profile/EmailVerify.vue';
import ProfileSettings from '@/views/profile/ProfileSettings.vue';

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
        path: '/email-verify',
        name: 'email-verify',
        component: EmailVerify,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/change-user-info',
        name: 'change-user-info',
        component: ChangeUserInfo,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: ChangePassword,
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
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
            }
            next();
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
