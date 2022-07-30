import { createStore } from 'vuex';
import auth from './auth';
import profile from './profile';
import ui from './ui';
import user from './user';

export default createStore({
    state: {
        notifications: {},
    },
    getters: {
        getNotifications: (state) => state.notifications,
    },
    mutations: {
        PUSH_NOTIFICATION: (state, notification) => {
            const id = (
                Math.random().toString(36) + Date.now().toString(36)
            ).substring(2);
            state.notifications[id] = {
                id,
                type: notification.type,
                msg: notification.msg,
            };
        },
        POP_NOTIFICATION: (state, notificationId) => {
            delete state.notifications[notificationId];
        },
    },
    actions: {
        pushNotification: ({ commit }, payload) => {
            commit('PUSH_NOTIFICATION', payload);
        },
        popNotification: ({ commit }, payload) => {
            commit('POP_NOTIFICATION', payload);
        },
    },
    modules: {
        auth,
        ui,
        profile,
        user,
    },
});
