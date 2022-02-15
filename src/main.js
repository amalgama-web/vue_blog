import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';
import textService from './services/textService';

const app = createApp(App);

const store = createStore({
    state() {
        return {
            favorites: [],

            user: {
                id: null,
                email: null,
                token: null,
                expire: null,
                fullName: null,
            }
        }
    },

    getters: {
        favoritesCount(state) {
            return state.favorites.length;
        },

        isAuthenticated(state) {
            return !!state.user.token;
        },

        token(state) {
            return state.user.token;
        },

        userId(state) {
            return state.user.id;
        },

        userInitials(state) {
            return state.user.token ? textService.getInitialsFromFullName(state.user.fullName) : '';
        },

        userFullname(state) {
            return state.user.token ? state.user.fullName : '';
        }
    },

    mutations: {
        addToFavorites(state, articleId) {

            state.favorites.push(articleId);

        },

        removeFromFavorites(state, articleId) {

            state.favorites = state.favorites.filter(id => id !== articleId);

        },

        setFavorites(state, newFavoritesList) {

            state.favorites = newFavoritesList;

        },

        setUser(state, userData) {
            state.user = {
                id: userData.id,
                token: userData.token,
                expire: userData.expire,
                fullName: userData.fullName,
                email: userData.email
            };
        },

        logout(state) {
            state.user = {
                id: null,
                email: null,
                token: null,
                expire: null,
                fullName: null
            };
        }
    },

    actions: {
        preloadFavorites(context) {
            const url = `https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/usersFavorites/` +
                `${context.getters.userId}.json` +
                `?auth=${context.getters.token}`;

            fetch(url)
                .then(response => {

                    return response.json();

                })

                .then(responseData => {

                    if (responseData) context.commit('setFavorites', responseData);

                });

        },

        toggleArticleInFavorites(context, articleId) {

            if ( context.state.favorites.some(id => id === articleId) ) {
                context.commit('removeFromFavorites', articleId);
            } else {
                context.commit('addToFavorites', articleId);
            }

            const url = `https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/usersFavorites/` +
                `${context.getters.userId}.json` +
                `?auth=${context.getters.token}`;

            // todo возвращать предыдущее значение при ошибке запроса добавления в избранное
            fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(context.state.favorites)
                })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    console.log(responseData);
                });
        },


        signUp(context, payload) {

            const preparedFullName = textService.prepareFullName(payload.name, payload.secondName);

            fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkynVLaz8d5mCQCSdJHG_QBNmq6JpVR-4`, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    displayName: preparedFullName,
                    photoUrl: 'http://risovach.ru/upload/2014/11/mem/spanch-bob-voobrazhenie_65439201_orig_.jpeg',
                    returnSecureToken: true
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    context.dispatch('setUser', {
                        id: responseData.localId,
                        email: responseData.email,
                        token: responseData.idToken,
                        expire: responseData.expiresIn,
                        fullName: preparedFullName
                    });
                });
        },

        setUserFromStorage(context) {
            const userData = JSON.parse( localStorage.getItem('userData') );

            if (!userData) return;

            context.commit('setUser', userData);
            context.dispatch('preloadFavorites');
        },

        setUser(context, userData) {
            context.commit('setUser', userData)
            localStorage.setItem('userData', JSON.stringify(userData));
        },

        logout(context) {
            context.commit('logout');
            localStorage.removeItem('userData');
        }
    }
});

app.use(store)
    .use(router)
    .mount('#app');
