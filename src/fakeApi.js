function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getRandTimeout() {
    return Math.round(Math.random() * 500) + 200;
}

function getArticles() {
    let jsonStr = localStorage.getItem('articles');
    return jsonStr ? JSON.parse(jsonStr) : [];
}

function createPromise(response) {
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve(response);
        }, getRandTimeout() );
    });
}

export const fakeApi = {
    getArticlesList(start, end) {
        let articles = getArticles();
        let outputArticles = articles.slice(start - 1, end);

        let response = {
            articles: outputArticles,
            length: articles.length
        };

        return createPromise(response);
    },

    getArticleById(articleId) {
        let response = getArticles().find( item => item.id === articleId);
        return createPromise(response);
    },

    addArticle(newArticleData) {
        let articles = getArticles();

        newArticleData.id = generateId();
        newArticleData.commentList = [];

        articles.push(newArticleData);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = newArticleData.id;

        return createPromise(response);
    },

    updateArticle(updatedArticleData, articleId) {
        let articles = getArticles();
        let updatedArticle  = articles.find( item => item.id === articleId);

        Object.assign(updatedArticle, updatedArticleData);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = updatedArticle.id;

        return createPromise(response);
    },

    addComment(newCommentData, articleId) {
        newCommentData.id = generateId();
        newCommentData.childComments = [];

        let articles = getArticles();
        let currentArticle = articles.find( item => item.id === articleId);

        currentArticle.commentList.push(newCommentData);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = newCommentData;
        return createPromise(response);
    },

    removeArticle(articleId) {
        let articles = getArticles();
        let indexForRemove = articles.findIndex(article => article.id === articleId );

        articles.splice(indexForRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = true;
        return createPromise(response);
    },

    removeComment(commentId, articleId) {
        let articles = getArticles();

        let currentArticle = articles.find( item => item.id === articleId);

        let commentIndexForRemove = currentArticle.commentList.findIndex(item => item.id === commentId );

        currentArticle.commentList.splice(commentIndexForRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = true;
        return createPromise(response);
    }
};

