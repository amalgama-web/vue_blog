import { createStore } from "vuex";

import favorites from "./favorites"
import user from "./user"
import notifications from "./notifications"


const store = createStore({
    modules: {
        favorites: favorites,
        user: user,
        notify: notifications
    }
});

export default store;