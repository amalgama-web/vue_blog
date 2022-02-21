import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

import textService from './services/textService';
import createUrlService from './services/createUrlService';

const app = createApp(App);

const store = createStore({
    state() {
        return {
            favorites: [],
            favoritesLoading: true,

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

        isFavoritesLoading(state) {
            return state.favoritesLoading;
        },

        isAuth(state) {
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

        userFullName(state) {
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

        startPreloader(state) {
            state.favoritesLoading = true;
        },

        stopPreloader(state) {
            state.favoritesLoading = false;
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

        startPreloader(context) {
            context.commit('startPreloader');
        },

        stopPreloader(context) {
            context.commit('stopPreloader');
        },

        async preloadFavorites(context) {
            context.dispatch('startPreloader');
            try {
                const url = createUrlService.favoritesList(context.getters.userId, context.getters.token);

                const response = await fetch(url);

                if(!response.ok) {
                    throw new Error('Ошибка загрузки избранного');
                }
                const responseData = await response.json();

                if (responseData) context.commit('setFavorites', responseData);

            } catch (e) {
                console.log(e.message);
            } finally {
                context.dispatch('stopPreloader');
            }

        },

        async toggleArticleInFavorites(context, articleId) {

            if ( context.state.favorites.some(id => id === articleId) ) {
                context.commit('removeFromFavorites', articleId);
            } else {
                context.commit('addToFavorites', articleId);
            }

            // todo возвращать предыдущее значение при ошибке запроса добавления в избранное
            try {
                const url = createUrlService.favoritesList(context.getters.userId, context.getters.token);

                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(context.state.favorites)
                });

                console.log(response);
                if(!response.ok) {
                    throw new Error('Ошибка загрузки избранного');
                }
                const responseData = await response.json();
                console.log(responseData);


            } catch (e) {
                console.log(e.message);
            }


        },


        signUp(context, payload) {

            const preparedFullName = textService.prepareFullName(payload.name, payload.secondName);
            const url = createUrlService.signUp;
            const data = {
                email: payload.email,
                password: payload.password,
                displayName: preparedFullName,
                photoUrl: 'http://risovach.ru/upload/2014/11/mem/spanch-bob-voobrazhenie_65439201_orig_.jpeg',
                returnSecureToken: true
            };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
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

        signIn(context, payload) {

            const url = createUrlService.signIn;

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    console.log(responseData);
                    context.dispatch('setUser', {
                        id: responseData.localId,
                        email: responseData.email,
                        token: responseData.idToken,
                        expire: responseData.expiresIn,
                        fullName: responseData.displayName
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
            context.commit('setUser', userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            context.dispatch('preloadFavorites');
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
