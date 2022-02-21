
const DB_URL = `https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app`;

const API_KEY = `AIzaSyCkynVLaz8d5mCQCSdJHG_QBNmq6JpVR-4`;


export default {

    listOfFirstArticles(numbersOfArticles) {
        return DB_URL +
            `/articles.json` +
            `?orderBy="timeCreated"` +
            `&startAt=0` +
            `&limitToLast=${numbersOfArticles}`;
    },

    listOfAdditionalArticles(olderThan, numbersOfArticles) {
        return DB_URL +
            `/articles.json` +
            `?orderBy="timeCreated"` +
            `&startAt=0` +
            `&endAt=${olderThan}` +
            `&limitToLast=${numbersOfArticles}`;
    },

    listOfUserArticles(userId) {
        return DB_URL +
            `/articles.json` +
            `?orderBy="creatorId"` +
            `&equalTo="${userId}"`;
    },

    // listOfArchivedlArticles() {
    //     return DB_URL +
    //         `/articles.json` +
    //         `?orderBy="timeCreated"` +
    //         `&endAt=0`;
    // },

    // listOfUserFavoritesArticles(favoriteId) {
    //     return DB_URL +
    //         `/articles.json` +
    //         `?orderBy="$key"` +
    //         `&equalTo="${favoriteId}"`;
    // },

    article(articleId, token = '') {
        return DB_URL +
            `/articles` +
            `/${articleId}.json` +
            (token ? `?auth=${token}` : '');
    },

    articles(token) {
        return DB_URL +
            `/articles.json` +
            `?auth=${token}`;
    },

    listComments(articleId) {
        return DB_URL +
            `/comments` +
            `/${articleId}.json` +
            `?orderBy="isDeleted"` +
            `&equalTo=null`;
    },

    commentsAdd(articleId, token) {
        return DB_URL +
            `/comments` +
            `/${articleId}.json` +
            `?auth=${token}`;
    },

    commentEdit(articleId, commentId, token) {
        return DB_URL +
            `/comments` +
            `/${articleId}` +
            `/${commentId}.json` +
            `?auth=${token}`;
    },

    favoritesList(userId, token) {
        return DB_URL +
            `/usersFavorites` +
            `/${userId}.json` +
            `?auth=${token}`;
    },





    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,

    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,

    userInfo: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`



}