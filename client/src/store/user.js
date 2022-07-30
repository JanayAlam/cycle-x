import axios from 'axios';

export default {
    namespace: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        updateUser: async ({ commit }, { nid, email }) => {
            try {
                const payload = {};
                if (nid && email) {
                    payload.nid = nid;
                    payload.email = email;
                } else if (nid && !email) {
                    payload.nid = nid;
                } else if (!nid && email) {
                    payload.email = email;
                } else {
                    return;
                }

                const response = await axios.patch(`/users`, payload);
                commit('SET_USER', response.data);
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
