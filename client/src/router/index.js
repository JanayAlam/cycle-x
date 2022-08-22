import store from '@/store';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import Cycles from '@/views/admin/Cycles.vue';
import Hubs from '@/views/admin/Hubs.vue';
import SystemUsers from '@/views/admin/SystemUsers.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import PageNotFound from '@/views/errors/PageNotFound.vue';
import Home from '@/views/Home.vue';
import ChangePassword from '@/views/profile/ChangePassword.vue';
import ChangeUserInfo from '@/views/profile/ChangeUserInfo.vue';
import Dashboard from '@/views/profile/Dashboard';
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
        beforeEnter: (_to, from, next) => {
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
        beforeEnter: (_to, from, next) => {
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
        beforeEnter: (_to, from, next) => {
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
        beforeEnter: (_to, _from, next) => {
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
        beforeEnter: (_to, _from, next) => {
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
        beforeEnter: (_to, _from, next) => {
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
        beforeEnter: (_to, _from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/admin',
        name: 'admin-dashboard',
        component: AdminDashboard,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                if (store.getters['getUser'].roles.includes('ADMIN')) {
                    return next();
                }
                return next(from);
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/admin/hubs',
        name: 'admin-hubs',
        component: Hubs,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                if (store.getters['getUser'].roles.includes('ADMIN')) {
                    return next();
                }
                return next(from);
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/admin/hubs',
        name: 'admin-hubs',
        component: Hubs,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                if (store.getters['getUser'].roles.includes('ADMIN')) {
                    return next();
                }
                return next(from);
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/admin/cycles',
        name: 'admin-cycles',
        component: Cycles,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                if (store.getters['getUser'].roles.includes('ADMIN')) {
                    return next();
                }
                return next(from);
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/admin/users',
        name: 'system-users',
        component: SystemUsers,
        beforeEnter: (to, from, next) => {
            if (store.getters['isAuthenticated']) {
                if (store.getters['getUser'].roles.includes('ADMIN')) {
                    return next();
                }
                return next(from);
            }
            next({ name: 'login' });
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (_to, _from, next) => {
            if (store.getters['isAuthenticated']) {
                return next();
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
