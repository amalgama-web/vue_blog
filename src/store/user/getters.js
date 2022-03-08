import textService from "../../services/textService";

export default {
    isAuth(state) {
        return !!state.token;
    },

    token(state) {
        return state.token;
    },

    expireTime(state) {
        return state.expireTime;
    },

    userId(state) {
        return state.id;
    },

    userInitials(state) {
        return state.token ? textService.getInitialsFromFullName(state.fullName) : '';
    },

    userFullName(state) {
        return state.token ? state.fullName : '';
    }
}