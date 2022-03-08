export default {
    setUser(state, userData) {
        state.id = userData.id;
        state.token = userData.token;
        state.expire = userData.expire;
        state.fullName = userData.fullName;
        state.email = userData.email;
    },

    setUserExpireTime(state, expireTime) {
        state.expireTime = expireTime;
    },

    logout(state) {
        state.id = null;
        state.email = null;
        state.token = null;
        state.expire = null;
        state.fullName = null;

        state.expireTime = null;
    }
}