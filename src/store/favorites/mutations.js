export default {
    startPreloader(state) {
        state.isLoading = true;
    },

    stopPreloader(state) {
        state.isLoading = false;
    },

    addToFavorites(state, articleId) {
        state.list.push(articleId);
    },

    removeFromFavorites(state, articleId) {
        state.list = state.list.filter(id => id !== articleId);
    },

    setFavorites(state, newFavoritesList) {
        state.list = newFavoritesList;
    },
}