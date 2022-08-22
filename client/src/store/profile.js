import axios from 'axios';

export default {
    namespace: true,
    state: {
        profiles: [],
    },
    getters: {
        getProfiles: (state) => state.profiles,
    },
    mutations: {
        SET_PROFILES: (state, profiles) => {
            state.profiles = profiles;
        },
    },
    actions: {
        changeProfileDetails: async (
            { commit },
            { firstName, lastName, dob }
        ) => {
            try {
                const response = await axios.patch(
                    `/profiles/settings/details`,
                    {
                        firstName,
                        lastName,
                        dob,
                    }
                );
                commit('SET_PROFILE', response.data);
                return response.data;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        },
        fetchAllProfiles: async ({ commit }, _payload) => {
            try {
                const response = await axios.get(`/profiles`);
                commit('SET_PROFILES', response.data);
                return response.data;
            } catch (error) {
                if (error.response) {
                    throw error.response.data;
                }
                throw error;
            }
        }
    },
};
