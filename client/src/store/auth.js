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
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_PROFILE: (state, profile) => {
            state.profile = profile;
        },
    },
    actions: {
        register: async (_context, payload) => {
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
                commit('SET_TOKEN', token);
            }
            if (!state.token) return;
            try {
                const response = await axios.get('/auth/me');

                // setting user and profile object
                commit('SET_USER', response.data.user);
                commit('SET_PROFILE', response.data.profile);
            } catch (error) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                commit('SET_PROFILE', null);
            }
        },
        logout: ({ commit }, _payload) => {
            commit('SET_TOKEN', null);
            commit('SET_USER', null);
            commit('SET_PROFILE', null);
        },
        forgetPassword: async (_context, email) => {
            try {
                await axios.post('/auth/forget-password', { email });
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        resetPassword: async (_context, payload) => {
            try {
                await axios.post(
                    `/auth/reset-password/${payload.userId}/${payload.token}`,
                    {
                        password: payload.password,
                        confirmPassword: payload.confirmPassword,
                    }
                );
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
    },
};
