import createUrlService from "../../services/createUrlService";

export default {
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

        if(!context.getters.isAuth) {
            context.dispatch('notify/show', {
                type: 'warning',
                text: 'Требуется авторизация',
                hideAfter: 1000
            });
            return;
        }

        if ( context.getters.favoritesList.some(id => id === articleId) ) {
            context.commit('removeFromFavorites', articleId);
        } else {
            context.commit('addToFavorites', articleId);
        }

        // todo возвращать предыдущее значение при ошибке запроса добавления в избранное
        try {
            const url = createUrlService.favoritesList(context.getters.userId, context.getters.token);

            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(context.getters.favoritesList)
            });

            if(!response.ok) {
                throw new Error('Ошибка загрузки избранного');
            }
            // const responseData = await response.json();

        } catch (e) {
            console.log(e.message);
        }

    },
}