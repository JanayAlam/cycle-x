export default {
    namespace: true,
    state: {
        authButtonActive: '',
    },
    getters: {
        getAuthButtonActive: (state) => state.authButtonActive,
    },
    mutations: {
        SET_IS_AUTH_BUTTON_ACTIVE: (state, value) => {
            state.authButtonActive = value;
        },
    },
    actions: {
        activeAuthButton: ({ commit }, value) => {
            if (value === 'register' || value === 'login') {
                commit('SET_IS_AUTH_BUTTON_ACTIVE', value);
            }
        },
    },
};
