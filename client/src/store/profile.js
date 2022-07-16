import axios from 'axios';

export default {
    namespace: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        changeProfileDetails: async ({ commit }, { firstName, lastName, dob }) => {
            try {
                const response = await axios.patch(`/profiles/settings/details`, {
                    firstName,
                    lastName,
                    dob,
                });
                commit('SET_PROFILE', response.data);
                return response.data;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
    },
};
