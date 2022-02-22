import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
    state() {
        return {
            id: null,
            email: null,
            token: null,
            expire: null,
            fullName: null,
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}
