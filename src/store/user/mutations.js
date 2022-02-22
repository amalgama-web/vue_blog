export default {
    setUser(state, userData) {
        state.id = userData.id;
        state.token = userData.token;
        state.expire = userData.expire;
        state.fullName = userData.fullName;
        state.email = userData.email;
    },

    logout(state) {
        state.id = null;
        state.email = null;
        state.token = null;
        state.expire = null;
        state.fullName = null;
    }
}