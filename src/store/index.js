import { createStore } from "vuex";

import favorites from "./favorites"
import user from "./user"


const store = createStore({
    modules: {
        favorites: favorites,
        user: user,
    }
});

export default store;