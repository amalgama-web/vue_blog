
const DB_URL = `https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app`;

const API_KEY = `AIzaSyCkynVLaz8d5mCQCSdJHG_QBNmq6JpVR-4`;


export default {

    listOfFirstArticles(numbersOfArticles) {
        return DB_URL +
            `/articles.json` +
            `?orderBy="timeCreated"` +
            `&limitToLast=${numbersOfArticles}`;
    },

    listOfAdditionalArticles(olderThan, numbersOfArticles) {
        return DB_URL +
            `/articles.json` +
            `?orderBy="timeCreated"` +
            `&endAt=${olderThan}` +
            `&limitToLast=${numbersOfArticles}`;
    },

    article(articleId, token = '') {
        return DB_URL +
            `/articles` +
            // `/${articleId}` +
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



    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,

    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,

    userInfo: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`



}