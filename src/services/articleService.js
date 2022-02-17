
function prepareComments(commentsObj) {
    let commentsList = [];

    for(let commentId in commentsObj) {
        commentsObj[commentId].commentsList = prepareComments(commentsObj[commentId].commentsList);

        commentsList.push({
            id: commentId,
            ...commentsObj[commentId]
        });
    }

    return commentsList;

}

export default {
    prepareArticlesList(articlesObject) {

        let articlesList = [];

        for(let id in articlesObject) {
            articlesObject[id].commentsList = prepareComments(articlesObject[id].commentsList);
            articlesList.push({
                id: id,
                ...articlesObject[id]
            });
        }

        return articlesList.reverse();
    },

    prepareArticle(articleObj, articleId) {

        articleObj.id = articleId;
        articleObj.commentsList = [];

        return articleObj;
    }
};