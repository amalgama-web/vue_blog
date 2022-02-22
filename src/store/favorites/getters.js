export default {
    favoritesList(state) {
        return state.list;
    },

    favoritesCount(state) {
        return state.list.length;
    },

    isFavoritesLoading(state) {
        return state.isLoading;
    },
}