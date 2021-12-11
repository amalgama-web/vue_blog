function createUniqID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const fakeApi = {

    getArticles() {
        let jsonStr = localStorage.getItem('articles');
        return jsonStr ? JSON.parse(jsonStr) : [];
    },

    getArticleByID(articleID) {
        let articles = this.getArticles();
        return articles.find( item => item.id === articleID);
    },

    addArticle(newArticleData) {
        let articles = this.getArticles();
        newArticleData.id = createUniqID();
        newArticleData.commentList = [];

        articles.push(newArticleData);

        localStorage.setItem('articles', JSON.stringify(articles));

        return newArticleData;
    },

    removeArticle(articleID) {
        let articles = this.getArticles();
        let indexToRemove = articles.findIndex(article => article.id === articleID );
        articles.splice(indexToRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        return true;
    },

    addComment(newCommentData, articleID) {
        newCommentData.id = createUniqID();
        newCommentData.childComments = [];

        let articles = this.getArticles();
        let currentArticle = articles.find( item => item.id === articleID);

        currentArticle.commentList.push(newCommentData);

        localStorage.setItem('articles', JSON.stringify(articles));

        return newCommentData;
    },

    removeComment(commentID, articleID) {
        let articles = this.getArticles();

        let currentArticle = articles.find( item => item.id === articleID);

        let commentIndexToRemove = currentArticle.commentList.findIndex(item => item.id === commentID );

        currentArticle.commentList.splice(commentIndexToRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        return true;
    }
};

