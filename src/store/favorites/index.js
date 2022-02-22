import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
    state() {
        return {
            list: [],
            isLoading: true,
        }
    },

    getters: getters,
    mutations: mutations,
    actions: actions,

};
