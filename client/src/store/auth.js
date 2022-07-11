import axios from 'axios';

export default {
    namespace: true,
    state: {
        token: null,
        user: null,
        profile: null,
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getProfile: (state) => state.profile,
        isAuthenticated: (state) => state.token && state.user && state.profile,
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
        },
        setUser: (state, user) => {
            state.user = user;
        },
        setProfile: (state, profile) => {
            state.profile = profile;
        },
    },
    actions: {
        register: async (_, payload) => {
            try {
                const response = await axios.post(`/auth/register`, payload);
                return response.data;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        login: async ({ dispatch }, payload) => {
            try {
                const response = await axios.post(`/auth/login`, payload);
                dispatch('attempt', response.data.token);
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        attempt: async ({ commit, state }, token) => {
            if (token) {
                commit('setToken', token);
            }
            if (!state.token) return;
            try {
                const response = await axios.get('/auth/me');

                // setting user and profile object
                commit('setUser', response.data.user);
                commit('setProfile', response.data.profile);
            } catch (error) {
                commit('setToken', null);
                commit('setUser', null);
                commit('setProfile', null);
            }
        },
        logout: ({ commit }, payload) => {
            commit('setToken', null);
            commit('setUser', null);
            commit('setProfile', null);
        }
    },
};
