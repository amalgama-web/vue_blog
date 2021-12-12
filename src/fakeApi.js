export const fakeApi = {
    _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    _getRandTimeout() {
        return Math.round(Math.random() * 1000) + 500;
    },
    
    _getArticles() {
        let jsonStr = localStorage.getItem('articles');
        return jsonStr ? JSON.parse(jsonStr) : [];
    },

    getArticles() {
        let response = this._getArticles();

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(response);
            }, this._getRandTimeout() );
        });
    },

    getArticleByID(articleID) {
        let articles = this._getArticles();
        let response = articles.find( item => item.id === articleID);
        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(response);
            }, this._getRandTimeout() );
        });
    },

    addArticle(newArticleData) {
        let articles = this._getArticles();

        newArticleData.id = this._generateId();
        newArticleData.commentList = [];

        articles.push(newArticleData);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = newArticleData.id;

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(response);
            }, this._getRandTimeout() );
        });
    },

    addComment(newCommentData, articleID) {
        newCommentData.id = this._generateId();
        newCommentData.childComments = [];

        let articles = this._getArticles();
        let currentArticle = articles.find( item => item.id === articleID);

        currentArticle.commentList.push(newCommentData);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = newCommentData;
        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(response);
            }, this._getRandTimeout() );
        });
    },

    removeArticle(articleID) {
        let articles = this._getArticles();
        let indexToRemove = articles.findIndex(article => article.id === articleID );

        articles.splice(indexToRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = true;
        return response;
    },

    removeComment(commentID, articleID) {
        let articles = this._getArticles();

        let currentArticle = articles.find( item => item.id === articleID);

        let commentIndexToRemove = currentArticle.commentList.findIndex(item => item.id === commentID );

        currentArticle.commentList.splice(commentIndexToRemove, 1);

        localStorage.setItem('articles', JSON.stringify(articles));

        let response = true;
        return response;
    }
};

