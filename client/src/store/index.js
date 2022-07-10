import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
    state: {
        token: {},
        user: null,
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;

            let base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const decoded = JSON.parse(window.atob(base64));
            state.user = decoded;
        },
    },
    actions: {
        REGISTER: async ({ commit }, payload) => {
            try {
                const response = await axios.post(`/auth/register`, payload);
                return response.data;
            } catch (error) {
                if (error.response) {
                    throw Error(error.response.data.message);
                } else {
                    throw error;
                }
            }
        },
        LOGIN: async ({ commit }, payload) => {
            try {
                const response = await axios.post(`/auth/login`, payload);
                const token = response.data;
                commit('setToken', token);
            } catch (error) {
                if (error.response) {
                    throw Error(error.response.data.message);
                } else {
                    throw error;
                }
            }
        },
    },
    modules: {},
});

