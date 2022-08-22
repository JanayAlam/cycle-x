import axios from 'axios';

export default {
    namespace: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchAllHubs: async (_context, _payload) => {
            try {
                const response = await axios.get(`/hubs`);
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
