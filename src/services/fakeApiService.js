import commentsService from './commentsService';

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getRandTimeout() {
    return Math.round(Math.random() * 500) + 200;
}

function getArticlesFromLS() {
    const jsonStr = localStorage.getItem('articlesAppData');
    return jsonStr ? JSON.parse(jsonStr) : [];
}

function setArticlesToLS(data) {
    localStorage.setItem('articlesAppData', JSON.stringify(data));
}

function createPromise(response) {
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve(response);
        }, getRandTimeout() );
    });
}

export default {
    getArticlesList(start, end) {
        const articles = getArticlesFromLS();
        let outputArticles = [];

        if (start !== undefined && end !== undefined) {
            outputArticles = articles.slice(start - 1, end);
        } else {
            outputArticles = articles;
        }

        outputArticles = outputArticles.map( article => {
            return {
                name: article.name,
                id: article.id,
                shortText: article.shortText,
                commentList: article.commentList
            }
        });

        const response = {
            articles: outputArticles,
            length: articles.length
        };

        return createPromise(response);
    },

    getArticleById(articleId) {
        const articles = getArticlesFromLS();
        const response = articles.find( item => item.id === articleId);
        return createPromise(response);
    },

    addArticle(newArticleData) {
        const articles = getArticlesFromLS();

        newArticleData.id = generateId();
        newArticleData.commentList = [];

        articles.push(newArticleData);

        setArticlesToLS(articles);

        const response = newArticleData.id;
        return createPromise(response);
    },

    updateArticle(updatedArticleData, articleId) {
        const articles = getArticlesFromLS();
        const articleForUpdate  = articles.find( item => item.id === articleId);

        Object.assign(articleForUpdate, updatedArticleData);

        setArticlesToLS(articles);

        const response = articleForUpdate.id;
        return createPromise(response);
    },

    addComment(newCommentData, articleId, parentCommentId) {
        const articles = getArticlesFromLS();
        const currentArticle = articles.find( item => item.id === articleId);
        const commentList = commentsService.getNodeData( currentArticle.commentList, parentCommentId ).childList;

        newCommentData.id = generateId();
        newCommentData.childComments = [];
        commentList.push(newCommentData);

        setArticlesToLS(articles);

        const response = newCommentData;
        return createPromise(response);
    },

    removeArticle(articleId) {
        const articles = getArticlesFromLS();
        const indexForRemove = articles.findIndex(article => article.id === articleId );

        articles.splice(indexForRemove, 1);

        setArticlesToLS(articles);

        const response = true;
        return createPromise(response);
    },

    removeComment(articleId, commentId) {
        const articles = getArticlesFromLS();
        const currentArticle = articles.find( item => item.id === articleId);
        const commentsTreeNode = commentsService.getNodeData(currentArticle.commentList, commentId);

        commentsTreeNode.currentNodeList.splice( commentsTreeNode.indexInCurrentNode, 1 );

        setArticlesToLS(articles);

        const response = true;
        return createPromise(response);
    }
};

